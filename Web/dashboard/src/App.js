import React, { useState, useEffect } from 'react';
import BestiaryWidget from './BestiaryWidget';
import WeatherWidget from './WeatherWidget';
import LoreWidget from './LoreWidget';
import './App.css';

// Komponenta Clock – hodiny a datum
function Clock() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const day = now.toLocaleDateString(undefined, { weekday: 'long' });
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 22,
        color: 'white',
        fontSize: '1.7rem',
        textAlign: 'right',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        userSelect: 'none',
        fontWeight: 'bold',
        minWidth: 120,
        zIndex: 10,
      }}
    >
      <div>
        {day}, {date}
      </div>
      <div style={{ fontSize: '2rem' }}>{time}</div>
    </div>
  );
}

// Komponenta jednoho odkazu s favicon, zobrazí jen pokud faviconUrl je zadán
function LinkItem({ url, title, faviconUrl }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'black',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        margin: '0.3rem 0',
        border: '1px solid rgba(85, 85, 85, 0.8)',
        borderRadius: '12px',
        backgroundColor: '#7a4f24',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        transition: 'background-color 0.3s, border-color 0.3s',
        cursor: 'pointer',
        userSelect: 'none',
        gap: '0.6rem',
        fontSize: '1.1rem',
        fontWeight: '500',
        boxSizing: 'border-box',
        maxWidth: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = 'rgba(167, 108, 36, 0.95)';
        e.currentTarget.style.borderColor = 'rgba(240, 217, 164, 0.9)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.45)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'rgba(122, 79, 36, 0.85)';
        e.currentTarget.style.borderColor = 'rgba(85, 85, 85, 0.8)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
      }}
    >
      {faviconUrl && (
        <img
          src={faviconUrl}
          alt={`${title} favicon`}
          style={{
            width: 20,
            height: 20,
            flexShrink: 0,
            marginRight: 8,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      )}
      <span
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'inline-block',
          maxWidth: 'calc(100% - 28px)',
          verticalAlign: 'middle',
        }}
      >
        {title}
      </span>
    </a>
  );
}

// Komponenta kategorie s rozbalováním
function CategorySection({ title, links, isOpen, onToggle }) {
  return (
    <section
      style={{
        padding: '1rem',
        border: '1px solid #7a4f24',
        borderRadius: '8px',
        backgroundColor: '#4b3221',
        boxSizing: 'border-box',
        width: '100%',
        userSelect: 'none',
      }}
    >
      <h2
        onClick={onToggle}
        style={{
          color: '#d9b382',
          borderBottom: '1px solid #7a4f24',
          marginBottom: isOpen ? '1rem' : '0',
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'margin-bottom 0.3s ease',
        }}
        aria-controls={`${title}-links`}
      >
        {title}
        <span
          style={{
            display: 'inline-block',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            userSelect: 'none',
            letterSpacing: '0.1rem',
          }}
        >
          ▶
        </span>
      </h2>

      <nav
        id={`${title}-links`}
        style={{
          display: isOpen ? 'block' : 'none',
          marginTop: '0.5rem',
        }}
      >
        {links.map(({ url, title, faviconUrl }, i) => (
          <LinkItem key={i} url={url} title={title} faviconUrl={faviconUrl} />
        ))}
      </nav>
    </section>
  );
}

// Komponenta Hero obrázku
function HeroImage({ src, alt, children }) {
  return (
    <div style={{ width: '100%', height: 700, overflow: 'hidden', marginBottom: '1rem' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
      {children}
    </div>
  );
}

// --- Hlavní komponenta App ---
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState(new Set());
  const [savedOpenCategories, setSavedOpenCategories] = useState(new Set());

  const linksData = [
    {
      title: "Kancelář",
      links: [
        { url: "https://gmail.com", title: "Gmail", faviconUrl: "/Dashboard/icons/gmail.png" },
        { url: "https://calendar.google.com", title: "Google Kalendář", faviconUrl: "/Dashboard/icons/calendar.png" },
        { url: "https://moof.faster.cz/", title: "Faster email", faviconUrl: "/Dashboard/icons/fastermail.png" },
        { url: "https://mail.proton.me/u/0/inbox?welcome=true", title: "Proton email", faviconUrl: "/Dashboard/icons/protonmail.jpeg" }, // lokální ikona
        { url: "https://drive.google.com/drive/my-drive", title: "Google disk", faviconUrl: "/Dashboard/icons/googledisk.png" },
        { url: "https://www.brnoid.cz/cs/", title: "BrnoID", faviconUrl: "/Dashboard/icons/brnoid.png" },
        { url: "https://pidlitacka.cz/cs/login", title: "Lítačka", faviconUrl: "/Dashboard/icons/litacka.png" },
        { url: "http://mojeid.cz/auction/password/", title: "MojeID", faviconUrl: "/Dashboard/icons/mojeid.png" },
        { url: "https://www.zsmsvir.cz/", title: "ZŠ Vír", faviconUrl: "/Dashboard/icons/vir.jpeg" },
        { url: "https://toolbrew.co/?utm_source=substack&utm_medium=email", title: "Online nástroje", faviconUrl: "/Dashboard/icons/onlinenastroje.png" },
      ],
    },
    {
      title: "Zábava",
      links: [
        { url: "https://www.youtube.com/", title: "Youtube", faviconUrl: "/Dashboard/icons/youtube.png" },
        { url: "https://www.metacritic.com/", title: "Metacritic", faviconUrl: "/Dashboard/icons/metacritic.png" },
        { url: "https://store.playstation.com/en-cz/pages/latest", title: "Playstation", faviconUrl: "/Dashboard/icons/playstation.png" },
        { url: "https://www.nintendo.com/us/", title: "Nintendo", faviconUrl: "/Dashboard/icons/nintendo.png" },
        { url: "https://www.bungie.net/7/", title: "Bungie", faviconUrl: "/Dashboard/icons/bungie.png" },
        { url: "https://store.steampowered.com/", title: "Steam", faviconUrl: "/Dashboard/icons/steam.png" },
        { url: "https://floor796.com/#t2l4,59,946", title: "Floor796", faviconUrl: "/Dashboard/icons/flor796.png" },
        { url: "https://eu.shop.battle.net/en-us#optLogin=true", title: "Blizzard" , faviconUrl: "/Dashboard/icons/battlenet.png"},
        { url: "https://store.epicgames.com/en-US/", title: "Epic", faviconUrl: "/Dashboard/icons/epic.png" },
        { url: "https://www.gog.com/en/", title: "GoG", faviconUrl: "/Dashboard/icons/gog.jpeg" },
        { url: "https://discord.com/channels/@me", title: "Discord", faviconUrl: "/Dashboard/icons/discord.png" },
        { url: "https://www.riotgames.com/en", title: "Riot", faviconUrl: "/Dashboard/icons/riot.png" },
        { url: "https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/edit?gid=0#gid=0", title: "Seznam her", faviconUrl: "/Dashboard/icons/tabulky.png" },
        { url: "https://www.twitch.tv/?no-reload=true", title: "Twitch", faviconUrl: "/Dashboard/icons/twitch.png" },
        { url: "https://www.ubisoft.com/en-us", title: "Ubisoft", faviconUrl: "/Dashboard/icons/ubisoft.png" },
        { url: "https://www.xbox.com/cs-CZ", title: "Xbox", faviconUrl: "/Dashboard/icons/xbox.png" },
        { url: "https://pocketpsn.com/Screamm316", title: "Pocket PSN", faviconUrl: "/Dashboard/icons/pocketpsn.png" },
        { url: "https://www.fanatical.com/en/ ", title: "Fanatical", faviconUrl: "/Dashboard/icons/fanatical.png" },
        { url: "https://raphamorim.io/gameboy/ ", title: "Gamboy Emulátor", faviconUrl: "/Dashboard/icons/gameboy.png" },
        { url: "https://play.geforcenow.com/mall/#/layout/games", title: "Geforce Now", faviconUrl: "/Dashboard/icons/geforcenow.png" },
      ],
    },
    {
      title: "Knihy",
      links: [
        { url: "https://www.knihydobrovsky.cz/", title: "Dobrovský", faviconUrl: "/Dashboard/icons/dobrovsky.png" },
        { url: "https://knihobot.cz/", title: "Knihobot", faviconUrl: "/Dashboard/icons/knihobot.png" },
        { url: "https://www.goodreads.com/", title: "Goodreads", faviconUrl: "/Dashboard/icons/goodreads.png" },
        { url: "https://www.databazeknih.cz/", title: "Databáze knih", faviconUrl: "/Dashboard/icons/databazeknih.png" },
        { url: "https://katalog.kjm.cz/arl-kjm/cs/index/", title: "Mahenova knihovna", faviconUrl: "/Dashboard/icons/mahenka.png" },
        { url: "https://www.trhknih.cz/", title: "Trh knih", faviconUrl: "/Dashboard/icons/trhknih.png" },
        { url: "http://192.168.31.195:5000/login", title: "Kavita", faviconUrl: "/Dashboard/icons/kavita.png" },
        { url: "https://www.amazon.com/hz/mycd/digital-console/contentlist/pdocs/dateDsc/?pageNumber=13", title: "Kindle", faviconUrl: "/Dashboard/icons/amazon.png" },
        { url: "https://z-library.sk/", title: "Z-library", faviconUrl: "/Dashboard/icons/zlibrary.png" },
        { url: "https://www.cbdb.cz/muj-prehled", title: "ČBDB", faviconUrl: "/Dashboard/icons/cbdb.png" },
      ],
    },
    {
      title: "Money",
      links: [
        { url: "https://login.kb.cz/login?sso=IB_RETAIL_OAUTH_PRXY&layout=BRAND", title: "Komerční banka", faviconUrl: "/Dashboard/icons/kb.png" },
        { url: "https://bezpecnost.csas.cz/wlogin/?app_id=GEORGE", title: "Česká spořitelna", faviconUrl: "/Dashboard/icons/csas.png" },
        { url: "https://ib.airbank.cz/", title: "Air bank", faviconUrl: "/Dashboard/icons/airbank.png" },
        { url: "https://docs.google.com/spreadsheets/d/1WeVX_QK7r1vaIrkpn0gwQgIMYH5P5xUvr0r1WnsZk-g/edit?gid=256684917#gid=256684917", title: "Splátky k úhradě", faviconUrl: "/Dashboard/icons/tabulky.png" },
        { url: "https://adisspr.mfcr.cz/pmd/home/prihlaseni-do-dis", title: "Moje daně", faviconUrl: "/Dashboard/icons/mojedane.png" },
        { url: "https://obcan.portal.gov.cz/prihlaseni", title: "Portál občana", faviconUrl: "/Dashboard/icons/portalobcana.png" },
        { url: "https://moje.allianz.cz/online-moa/cs/login/auth", title: "Moje Alianz", faviconUrl: "/Dashboard/icons/allianz.png" },
        { url: "http://192.168.31.194:8093/login", title: "Firefly III", faviconUrl: "/Dashboard/icons/firefly.jpeg" },
        { url: "http://192.168.31.192:8080/dashboard", title: "Invoice Ninja", faviconUrl: "/Dashboard/icons/invoiceninja.png" },
        { url: "https://docs.google.com/spreadsheets/d/1qAnssfHsxB1HHpp-lnZtq73sGAO6AklBCZHHBW5S7ZI/edit?gid=0#gid=0", title: "Splátka notebook", faviconUrl: "/Dashboard/icons/tabulky.png" },
        { url: "https://moje.o2.cz/customer/1940788545", title: "Moje O2", faviconUrl: "/Dashboard/icons/o2.png" },
        { url: "https://energie24.eon.cz/e24/", title: "Energie 24", faviconUrl: "/Dashboard/icons/e24.png" },
      ]
    },
    {
      title: "Nákupy",
      links: [
        { url: "https://www.aliexpress.com/?spm=a2g0o.order_list.logo.1.6b4d1802hMVVDo", title: "Aliexpress", faviconUrl: "/Dashboard/icons/aliexpress.png" },
        { url: "https://www.ikea.com/cz/cs/", title: "Ikea", faviconUrl: "/Dashboard/icons/ikea.png" },
        { url: "https://www.xzone.cz/", title: "Xzone", faviconUrl: "/Dashboard/icons/xzone.png" },
        { url: "https://www.dekudeals.com/games", title: "Deku Deals", faviconUrl: "/Dashboard/icons/dekudeals.png" },
        { url: "https://www.smarty.cz/", title: "Smarty", faviconUrl: "/Dashboard/icons/smarty.png" },
        { url: "https://www.alza.cz/", title: "Alza", faviconUrl: "/Dashboard/icons/alza.png" },
      ],
    },
    {
      title: "Monitoring",
      links: [
        { url: "http://192.168.31.189:3000/?orgId=1&from=now-6h&to=now&timezone=browser", title: "Grafana", faviconUrl: "/Dashboard/icons/grafana.png" },
        { url: "http://192.168.31.189:3001/dashboard", title: "Uptime Kuma", faviconUrl: "/Dashboard/icons/kuma.jpeg" },
      ],
    },
    {
      title: "Streaming",
      links: [
        { url: "https://www.netflix.com/browse", title: "Netflix", faviconUrl: "/Dashboard/icons/netflix.png" },
        { url: "https://www.crunchyroll.com/", title: "Crunchyroll", faviconUrl: "/Dashboard/icons/crunchyroll.png" },
        { url: "https://www.kinobox.cz/", title: "Kinobox", faviconUrl: "/Dashboard/icons/kinobox.png" },
        { url: "https://www.themoviedb.org/", title: "The movie Database", faviconUrl: "/Dashboard/icons/tmdb.png" },
        { url: "https://www.disneyplus.com/cs-cz/select-profile", title: "Disney+", faviconUrl: "/Dashboard/icons/disney.png" },
        { url: "https://www.oneplay.cz/", title: "Oneplay", faviconUrl: "/Dashboard/icons/oneplay.jpeg"},
        { url: "https://myanimelist.net/", title: "My Anime list", faviconUrl: "/Dashboard/icons/mal.png" },
        { url: "https://www.imdb.com/", title: "Imdb", faviconUrl: "/Dashboard/icons/imdb.jpeg" },
        { url: "http://95.129.96.148:8096/web/#/home.html", title: "Jellyfin", faviconUrl: "/Dashboard/icons/jellyfin.png" },
      ],
    },
    {
      title: "Tvorba",
      links: [
        { url: "https://www.figma.com/files/team/927309606831785081/recents-and-sharing?fuid=927309597157056889", title: "Figma", faviconUrl: "/Dashboard/icons/figma.jpeg" },
        { url: "https://www.photopea.com/", title: "Photopea", faviconUrl: "/Dashboard/icons/photophea.png" },
        { url: "https://projects.raspberrypi.org/en", title: "Raspberry projekty", faviconUrl: "/Dashboard/icons/raspberry.png" },
        { url: "https://screely.com/", title: "Screely", faviconUrl: "/Dashboard/icons/screely.jpeg" },
        { url: "https://scribehow.com/", title: "Scribe", faviconUrl: "/Dashboard/icons/scribe.png" },
        { url: "https://www.canva.com/", title: "Canva", faviconUrl: "/Dashboard/icons/canva.png" },
      ],
    },
    {
      title: "Ostatní",
      links: [
        { url: "https://www.notion.so/HQ-f653bbbbfc114869b815c917ead7ef85", title: "HQ", faviconUrl: "/Dashboard/icons/hq.png" },
        { url: "https://www.perplexity.ai/", title: "Perplexity", faviconUrl: "/Dashboard/icons/perplexity.png" },
        { url: "https://work-nx63121.slack.com/?redir=%2Faccount%2Fworkspace-settings#admins", title: "Slack Admin", faviconUrl:"/Dashboard/icons/slack.png" },
        { url: "https://www.nirsoft.net/?utm_source=substack&utm_medium=email", title: "NirSoft", faviconUrl: "/Dashboard/icons/nirsoft.png" },
        { url: "https://app.netlify.com/projects/scream316-fight-game/domain-management", title: "Netlify", faviconUrl: "/Dashboard/icons/netlify.png"},
        { url: "https://www.credly.com/users/pavel-snabl/edit#credly", title: "Creedly", faviconUrl: "/Dashboard/icons/credly.png" },
        { url: "https://webshare.cz/#/search", title: "Webshare", faviconUrl: "/Dashboard/icons/webshare.png" },
        { url: "https://webutility.io/favicon-extractor", title: "Favicon", faviconUrl: "/Dashboard/icons/favicon.png" },
        { url: "https://admin.webzdarma.cz/prihlaseni/?backlink=rv6mv", title: "Webzdarma", faviconUrl: "/Dashboard/icons/webzdarma.png" },
        { url: "https://github.com/", title: "Github", faviconUrl: "/Dashboard/icons/github.png" },
        { url: "https://sktorrent.eu/torrent/", title: "CzTorrent", faviconUrl: "/Dashboard/icons/cztorrent.png" },
        { url: "https://www.reddit.com/r/Piracy/wiki/megathread/#wiki_.1F3A6_movies_.26amp.3B_tv", title: "Piracy Guide", faviconUrl: "/Dashboard/icons/piracyguide.png" },
        { url: "https://jellyfine.synology.me:6751/", title: "NAS", faviconUrl: "/Dashboard/icons/synology.png" },
      ],
    },
    {
      title: "Náhradní díly",
      links: [
        { url: "https://www.dily-notebooky.cz/", title: "Díly NTB", faviconUrl: "/Dashboard/icons/ntb-servis.png" },
        { url: "https://shop.sil.cz/", title: "Sil servis"},
        { url: "https://eshop.compos.cz/default.asp", title: "Compos", faviconUrl: "/Dashboard/icons/compos.png" },
        { url: "https://www.rgshop.cz/", title: "RG Shop", faviconUrl: "/Dashboard/icons/rgshop.png" },
        { url: "https://www.klavesydoklavesnic.cz/", title: "Klávesy do klávesnic", faviconUrl: "/Dashboard/icons/klavesy.png" },
        { url: "https://www.technimax.cz/", title: "Technimax", faviconUrl: "/Dashboard/icons/technimax.png"},
        { url: "https://www.krup.cz/", title: "Krup Computer", faviconUrl: "/Dashboard/icons/krup.png" },
      ],
    },
  ];

  // Filtrování dat podle searchTerm
  const filteredLinksData = searchTerm.trim() === ''
    ? linksData
    : linksData
        .map(cat => ({
          ...cat,
          links: cat.links.filter(link =>
            link.title.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter(cat => cat.links.length > 0);

  // Synchronizace rozbalení kategorií podle searchTerm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setOpenCategories(new Set(savedOpenCategories));
    } else {
      if (savedOpenCategories.size === 0) {
        setSavedOpenCategories(new Set(openCategories));
      }
      const newOpen = new Set(filteredLinksData.map(cat => cat.title));
      setOpenCategories(newOpen);
    }
  }, [searchTerm]);

  // Přepnutí otevření/sbalení kategorie
  const toggleCategoryOpen = (categoryTitle) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryTitle)) {
        newSet.delete(categoryTitle);
      } else {
        newSet.add(categoryTitle);
      }
      return newSet;
    });
  };

  return (
    <div
      style={{
        backgroundColor: '#2e1a0f',
        minHeight: '100vh',
        padding: '1rem 2rem',
        fontFamily: "'Mystery Quest', cursive, bold",
        color: '#f3e9d2',
      }}
    >
      <HeroImage src={`${process.env.PUBLIC_URL}/images/hero.jpg`} alt="Hero Image">
        <Clock />
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 22,
            zIndex: 10,
            width: '300px', // Menší šířka pro hero image
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Poloprůhledné pozadí jako u hodin
            borderRadius: '8px',
            padding: '0.5rem',
          }}
        >
          <WeatherWidget />
        </div>
      </HeroImage>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '0rem',
          paddingTop: '1rem',
          width: '100%',
          boxSizing: 'border-box',
          alignItems: 'start',
        }}
      >

        {filteredLinksData.length > 0 ? (
          filteredLinksData.map(cat => (
            <CategorySection
              key={cat.title}
              title={cat.title}
              links={cat.links}
              isOpen={openCategories.has(cat.title)}
              onToggle={() => toggleCategoryOpen(cat.title)}
            />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#d9b382' }}>
            Nenašel se žádný odkaz odpovídající hledání.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
