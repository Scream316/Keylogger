import React, { useState, useEffect } from 'react';
import GameDashboard from './GameDashboard.js';
import WeeklyCalendar from './WeeklyCalendar';
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
    <div style={{ 
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
    }}>
      <div>{day}, {date}</div>
      <div style={{ fontSize: '2rem' }}>{time}</div>
    </div>
  );
}

// Komponenta jednoho odkazu s favicon
function LinkItem({ url, title }) {
  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  })();

  const faviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    : null;

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
      <span style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        maxWidth: 'calc(100% - 28px)',
        verticalAlign: 'middle',
      }}>
        {title}
      </span>
    </a>
  );
}

// Komponenta kategorie s rozbalováním
function CategorySection({ title, links, isOpen, onToggle }) {
  return (
    <section style={{ 
      padding: '1rem', 
      border: '1px solid #7a4f24',      
      borderRadius: '8px', 
      backgroundColor: '#4b3221',
      boxSizing: 'border-box',
      width: '100%',
      userSelect: 'none',
    }}>
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
        <span style={{
          display: 'inline-block',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          userSelect: 'none',
          letterSpacing: '0.1rem',
        }}>
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
        {links.map(({ url, title }, i) => (
          <LinkItem key={i} url={url} title={title} />
        ))}
      </nav>
    </section>
  );
}

// Komponenta Hero obrázku
function HeroImage({ src, alt, children }) {
  return (
    <div style={{ width: '100%', height: 900, overflow: 'hidden', marginBottom: '1rem' }}>
      <img 
        src={src}
        alt={alt}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
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
        { url: "https://gmail.com", title: "Gmail" },
        { url: "https://calendar.google.com", title: "Google Kalendář" },
        { url: "https://email.faster.cz/", title: "Faster email" },
        { url: "https://calendar.google.com", title: "Google Kalendář" },
        { url: "https://mail.proton.me/u/0/inbox?welcome=true", title: "Proton email" },
        { url: "https://drive.google.com/drive/my-drive", title: "Google disk" },
        { url: "https://www.brnoid.cz/cs/", title: "BrnoID" },
        { url: "https://pidlitacka.cz/cs/login", title: "Lítačka" },
        { url: "http://mojeid.cz/auction/password/", title: "MojeID" },
        { url: "http://192.168.31.193:3030/#/timesheet/list", title: "Traggo" },
        { url: "http://192.168.31.190:8080/", title: "Stirling PDF" },
        { url: "https://www.mojedatovaschranka.cz/as/login?uri=https%3a%2f%2fwww.mojedatovaschranka.cz%2fportal%2fISDS%2f&status=NCOO", title: "Datové schránky" },
      ],
    },
    {
      title: "Zábava",
      links: [
        { url: "https://www.youtube.com/", title: "Youtube" },
        { url: "https://www.metacritic.com/", title: "Metacritic" },
        { url: "https://store.playstation.com/en-cz/pages/latest", title: "Playstation" },
        { url: "https://www.nintendo.com/us/", title: "Nintendo" },
        { url: "https://www.bungie.net/7/", title: "Bungie" },
        { url: "https://store.steampowered.com/", title: "Steam" },
        { url: "https://floor796.com/#t2l4,59,946", title: "Flor796" },
        { url: "https://eu.shop.battle.net/en-us#optLogin=true", title: "Blizzard" },
        { url: "https://store.epicgames.com/en-US/", title: "Epic" },
        { url: "https://www.gog.com/en/", title: "GoG" },
        { url: "https://discord.com/channels/@me", title: "Discord" },
        { url: "https://www.riotgames.com/en", title: "Riot" },
        { url: "https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/edit?gid=0#gid=0", title: "Seznam her" },
        { url: "https://www.twitch.tv/?no-reload=true", title: "Twitch" },
        { url: "https://www.ubisoft.com/en-us", title: "Ubisoft" },
        { url: "https://www.xbox.com/cs-CZ", title: "Xbox" },
        { url: "https://pocketpsn.com/Screamm316", title: "Pocket PSN" },
      ],
    },
    {
      title: "Knihy",
      links: [
        { url: "https://www.knihydobrovsky.cz/", title: "Dobrovský" },
        { url: "https://calendar.google.com", title: "Knihobot" },
        { url: "https://www.goodreads.com/", title: "Goodreads" },
        { url: "https://www.databazeknih.cz/", title: "Databáze knih" },
        { url: "https://katalog.kjm.cz/arl-kjm/cs/index/", title: "Mahenova knihovna" },
        { url: "https://www.trhknih.cz/", title: "Trh knih" },
        { url: "http://192.168.31.195:5000/login", title: "Kavita" },
      ],
    },
    {
      title: "Money",
      links: [
        { url: "https://login.kb.cz/login?sso=IB_RETAIL_OAUTH_PRXY&layout=BRAND", title: "Komerční banka" },
        { url: "https://bezpecnost.csas.cz/wlogin/?app_id=GEORGE", title: "Česká spořitelna" },
        { url: "https://ib.airbank.cz/", title: "Air bank" },
        { url: "https://docs.google.com/spreadsheets/d/1WeVX_QK7r1vaIrkpn0gwQgIMYH5P5xUvr0r1WnsZk-g/edit?gid=256684917#gid=256684917", title: "Splátky k úhradě" },
        { url: "https://adisspr.mfcr.cz/pmd/home/prihlaseni-do-dis", title: "Moje daně" },
        { url: "https://obcan.portal.gov.cz/prihlaseni", title: "Portál občana" },
        { url: "https://moje.allianz.cz/online-moa/cs/login/auth", title: "Moje Alianz" },
        { url: "http://mojeid.cz/auction/password/", title: "Zdravotní pojišťovna" },
        { url: "http://192.168.31.194:8093/login", title: "Firefly III" },
        { url: "http://192.168.31.192:8080/dashboard", title: "Invoice Ninja" },
        { url: "https://docs.google.com/spreadsheets/d/1qAnssfHsxB1HHpp-lnZtq73sGAO6AklBCZHHBW5S7ZI/edit?gid=0#gid=0", title: "Splátka notebook" },
      ],
    },
    {
      title: "Nákupy",
      links: [
        { url: "https://www.aliexpress.com/?spm=a2g0o.order_list.logo.1.6b4d1802hMVVDo", title: "Aliexpress" },
        { url: "https://www.ikea.com/cz/cs/", title: "Ikea" },
        { url: "https://www.xzone.cz/", title: "Xzone" },
        { url: "https://www.dekudeals.com/games", title: "Deku Deals" },
        { url: "https://www.smarty.cz/", title: "Smarty" },
        { url: "https://www.alza.cz/", title: "Alza" },
      ],
    },
    {
      title: "Monitoring",
      links: [
        { url: "http://192.168.31.189:3000/?orgId=1&from=now-6h&to=now&timezone=browser", title: "Grafana" },
        { url: "http://192.168.31.189:3001/dashboard", title: "Uptime Kuma" },
      ],
    },
    {
      title: "Streaming",
      links: [
        { url: "https://www.netflix.com/browse", title: "Netflix" },
        { url: "https://www.crunchyroll.com/", title: "Crunchyroll" },
        { url: "https://www.kinobox.cz/", title: "Kinobox" },
        { url: "https://www.themoviedb.org/", title: "The movie Database" },
        { url: "https://www.disneyplus.com/cs-cz/select-profile", title: "Disney+" },
        { url: "https://www.oneplay.cz/", title: "Oneplay" },
        { url: "https://myanimelist.net/", title: "My Anime list" },
        { url: "https://www.imdb.com/", title: "Imdb" },
      ],
    },
    {
      title: "Tvorba",
      links: [
        { url: "https://www.figma.com/files/team/927309606831785081/recents-and-sharing?fuid=927309597157056889", title: "Figma" },
        { url: "https://www.photopea.com/", title: "Photopea" },
        { url: "https://projects.raspberrypi.org/en", title: "Raspberry projekty" },
        { url: "https://screely.com/", title: "Screely" },
        { url: "https://scribehow.com/", title: "Scribe" },
        { url: "https://www.canva.com/", title: "Canva" },
      ],
    },
    {
      title: "Ostatní",
      links: [
        { url: "https://www.notion.so/HQ-f653bbbbfc114869b815c917ead7ef85", title: "HQ" },
        { url: "https://www.perplexity.ai/", title: "Perplexity" },
        { url: "https://projects.raspberrypi.org/en", title: "Git hub"},
        { url: "https://work-nx63121.slack.com/?redir=%2Faccount%2Fworkspace-settings#admins", title: "Slack Admin" },
        { url: "https://www.nirsoft.net/?utm_source=substack&utm_medium=email", title: "NirSoft" },
        { url: "https://app.netlify.com/projects/scream316-fight-game/domain-management", title: "Netlify" },
        { url: "https://www.credly.com/users/pavel-snabl/edit#credly", title: "Creedly" },
        { url: "https://webshare.cz/#/search", title: "Webshare" },
      ],
    }
  ];

  // Filtrování dat podle searchTerm
  const filteredLinksData = searchTerm.trim() === ''
    ? linksData
    : linksData
        .map(cat => ({
          ...cat,
          links: cat.links.filter(link => 
            link.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }))
        .filter(cat => cat.links.length > 0);

  // Synchronizace rozbalení kategorií podle searchTerm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Vrátit stav otevřených kategorií do původního stavu (uloženého v savedOpenCategories)
      setOpenCategories(new Set(savedOpenCategories));
    } else {
      // Uložíme původní rozbalené kategorie pokud ještě nejsou uloženy
      if (savedOpenCategories.size === 0) {
        setSavedOpenCategories(new Set(openCategories));
      }
      // Rozbalíme všechny odpovídající kategorie vyhledávání
      const newOpen = new Set(filteredLinksData.map(cat => cat.title));
      setOpenCategories(newOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div style={{ 
      backgroundColor: '#2e1a0f', 
      minHeight: '100vh', 
      padding: '1rem 2rem', 
      fontFamily: "'Mystery Quest', cursive, bold",
      color: '#f3e9d2',   
    }}>
      <HeroImage src="/images/hero.jpg" alt="Hero Image">
        <Clock />
      </HeroImage>

      <GameDashboard />

      <WeeklyCalendar />
      <div style={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Hledat odkazy..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '0.5rem 1rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: '1px solid #7a4f24',
            backgroundColor: '#4b3221',
            color: '#f3e9d2',
            outline: 'none',
          }}
        />
      </div>
      
      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'start',
      }}>
        {filteredLinksData.length > 0 ? filteredLinksData.map(cat => (
          <CategorySection
            key={cat.title}
            title={cat.title}
            links={cat.links}
            isOpen={openCategories.has(cat.title)}
            onToggle={() => toggleCategoryOpen(cat.title)}
          />
        )) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#d9b382' }}>
            Nenašel se žádný odkaz odpovídající hledání.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
