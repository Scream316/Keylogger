#!/usr/bin/env python3
"""
EG.D BRNO - PSČ + TERMÍN/ČASY + ULICOVÉ ŘÁDKY + SEZNAM UZLŮ Z CSV
SMTP SSL přes moof.faster.cz (interní, bez ověřování certu)
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from datetime import datetime
import time
import re
import smtplib
import ssl
from email.message import EmailMessage
import csv  # CSV seznam uzlů [web:79][web:85]

# ===== SMTP NASTAVENÍ – DOPLŇ SI ÚČET/HESLO =====
SMTP_HOST = "moof.faster.cz"
SMTP_PORT = 465  # SSL SMTP [web:36]
SMTP_USER = "servis@faster.cz"   # bez diakritiky v loginu [web:26]
SMTP_PASS = "wieth3um8Uequ3"
EMAIL_TO  = "servis@faster.cz"

# ===== SOUBOR S UZLY =====
CSV_FILE = "seznam_uzlu.csv"  # musí být ve stejné složce jako script [web:79]

# Očekávané sloupce v CSV:
# device_name,city,street,house_number,zip

# ===== SEZNAM PSČ BRNO + OKOLÍ =====
BRNO_PSC = [
    '60200', '60300', '61100', '61200', '61201', '61202', '61203', '61204', '61205',
    '61206', '61207', '61300', '61400', '61500', '61600', '61700', '61900',
    '62000', '62100', '62200', '62300', '62400', '62500', '63500', '63700', '63900',
    '64100', '62332', '62333', '62334', '62335', '62336', '62337', '66441',
    '62132', '62700', '62800', '63501', '63502', '62900', '66442', '66403'
]

# regex na čas ve formátu HH:MM [web:68][web:75]
TIME_RE = re.compile(r"\b\d{1,2}:\d{2}\b")

def load_devices():
    """Načte seznam uzlů ze CSV jako list slovníků (jeden řádek = jedno zařízení). [web:79]"""
    devices = []
    with open(CSV_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)  # hlavička CSV = názvy polí [web:79][web:85]
        for row in reader:
            devices.append(row)
    return devices

def setup_driver():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

def check_psc_outage(driver, psc):
    """
    Pro zadané PSČ:
      - zjistí, jestli je výpadek (PSČ + nějaký čas HH:MM na stránce),
      - vrátí řádky s "ulice",
      - vrátí řádky s termínem/časy.

    return: (is_outage: bool, lines_with_ulice: list[str], lines_with_term: list[str])
    """
    try:
        driver.get("https://www.egd.cz/odstavky-elektrina")
        time.sleep(3)

        search_box = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='search'], input[placeholder*='PSČ']"))
        )
        search_box.clear()
        search_box.send_keys(psc)
        search_box.send_keys(Keys.ENTER)
        time.sleep(6)

        page_text = driver.page_source.lower()
        has_psc = psc.lower() in page_text
        has_time_any = bool(TIME_RE.search(page_text))  # jestli se na stránce vyskytuje nějaký čas [web:68]
        is_outage = has_psc and has_time_any

        lines_with_ulice = []
        lines_with_term = []

        if is_outage:
            try:
                full_text = driver.find_element(By.TAG_NAME, "body").text  # všechen text stránky [web:51]
                for raw_line in full_text.splitlines():
                    line = raw_line.strip()
                    if not line:
                        continue
                    low = line.lower()

                    # řádky s ulicí
                    if "ulice" in low:
                        if line not in lines_with_ulice:
                            lines_with_ulice.append(line)

                    # řádky s termínem/časem (klíčová slova + výskyt HH:MM)
                    if ("plánovaný termín" in low or "termín" in low or TIME_RE.search(low)):
                        if line not in lines_with_term:
                            lines_with_term.append(line)
            except Exception as e:
                print(f"  ⚠️ Nelze načíst body text pro {psc}: {e}")

        if psc in ['66441', '63700', '61200', '62100']:
            print(
                f"DEBUG {psc}: PSČ={'✓' if has_psc else '✗'} "
                f"ČAS={'✓' if has_time_any else '✗'} "
                f"ULICE_ŘÁDKŮ={len(lines_with_ulice)} TERM_ŘÁDKŮ={len(lines_with_term)}"
            )

        return is_outage, lines_with_ulice, lines_with_term

    except Exception as e:
        print(f"CHYBA {psc}: {e}")
        return False, [], []

def match_devices_for_psc(psc, streets_lines, devices):
    """
    Najde zařízení z CSV, která leží v daném PSČ a jejich ulice se vyskytuje
    v některém z řádků s ulicemi. [web:46][web:77]
    """
    matched = []
    for dev in devices:
        if dev.get("zip") != psc:
            continue
        street = (dev.get("street") or "").lower()
        if not street:
            continue
        for line in streets_lines:
            if street in line.lower():
                matched.append(dev)
                break
    return matched

def send_email_notification(outages, outages_detail, timestamp, devices):
    """
    Odešle mail přes SMTP SSL na moof.faster.cz.

    outages: list PSČ s výpadkem.
    outages_detail: list (psc, [ulice_řádky], [termín_řádky]).
    devices: seznam zařízení načtených z CSV.
    """
    # Zjistit, jestli existuje aspoň jedno zařízení z CSV v dotčených ulicích
    any_matched_devices = False
    per_psc_matches = []

    for psc, streets_lines, term_lines in outages_detail:
        matched = match_devices_for_psc(psc, streets_lines, devices)
        per_psc_matches.append((psc, streets_lines, term_lines, matched))
        if matched:
            any_matched_devices = True

    if not outages or not any_matched_devices:
        # Buď žádné výpadky, nebo žádné zařízení z CSV v dotčených ulicích
        subject = "✅ EG.D Brno – žádné plánované odstávky sledovaných zařízení"
        body = (
            "Pro sledovaná zařízení nejsou v tuto chvíli nalezeny žádné plánované odstávky.\n"
            f"Čas kontroly: {timestamp}\n"
            "https://www.egd.cz/odstavky-elektrina"
        )
    else:
        subject = f"🚨 EG.D Plánované odstávky ({len(outages)} PSČ) – dotčená zařízení"

        lines = [
            f"Odstávky ({len(outages)} PSČ): {', '.join(outages)}",
            f"Čas kontroly: {timestamp}",
            "https://www.egd.cz/odstavky-elektrina",
            "",
            'Detaily (PSČ + termín/čas + ulice + zařízení z CSV):'
        ]

        for psc, streets_lines, term_lines, matched in per_psc_matches:
            if not matched:
                # Pro dané PSČ sice výpadek je, ale žádné naše zařízení – přeskočíme
                continue

            lines.append("")
            lines.append(f"{psc}:")
            if term_lines:
                lines.append("  Termín / čas:")
                for ln in term_lines:
                    lines.append(f"    {ln}")
            if streets_lines:
                lines.append("  Ulice:")
                for ln in streets_lines:
                    lines.append(f"    {ln}")

            lines.append("  Zařízení v dotčených ulicích:")
            for dev in matched:
                lines.append(
                    f"    {dev.get('device_name')} "
                    f"({dev.get('street')} {dev.get('house_number')}, {dev.get('zip')})"
                )

        body = "\n".join(lines)

    msg = EmailMessage()
    msg["From"] = SMTP_USER
    msg["To"] = EMAIL_TO
    msg["Subject"] = subject
    msg.set_content(body)

    print(f"\n📧 ODESÍLÁM PŘES SMTP SSL → {EMAIL_TO} (host={SMTP_HOST}, port={SMTP_PORT})")

    context = ssl._create_unverified_context()

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=30) as server:
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)

    print("✅ EMAIL PŘES SMTP SSL ODESLÁN!")

def main():
    print("=== EG.D BRNO - SMTP SSL + TERMÍN/ČASY + ULIČNÍ ŘÁDKY + CSV UZLY ===")

    devices = load_devices()
    print(f"📄 Načteno zařízení z CSV: {len(devices)}")

    driver = setup_driver()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    outages = []         # jen PSČ s výpadkem
    outages_detail = []  # (psc, [řádky s "ulice"], [řádky s termínem/časy])

    print(f"\n🔍 Kontrola {len(BRNO_PSC)} PSČ...")

    for i, psc in enumerate(BRNO_PSC, 1):
        print(f"  [{i:2d}/{len(BRNO_PSC)}] {psc}...", end=" ")
        is_outage, lines_with_ulice, lines_with_term = check_psc_outage(driver, psc)
        if is_outage:
            print("🚨 VÝPADek!")
            outages.append(psc)
            outages_detail.append((psc, lines_with_ulice, lines_with_term))
        else:
            print("✅ OK")

    driver.quit()

    if outages:
        status = f"🚨 VÝPADKY ({len(outages)} PSČ): {', '.join(outages)}"
    else:
        status = f"✅ ŽÁDNE VÝPADKY ({len(BRNO_PSC)} PSČ OK)"

    print("\n" + "="*60)
    print(status)
    print("="*60)

    send_email_notification(outages, outages_detail, timestamp, devices)
    print("\n🎉 DOKONČENO!")

if __name__ == "__main__":
    main()
