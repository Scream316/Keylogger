import React, { useState, useEffect } from 'react';

const loreData = [
  {
    title: 'Zlatý drak Villentretenmerth',
    description: 'Villentretenmerth, známý jako Borch Tři Kavky, je zlatý drak schopný měnit podobu. Pomohl Geraltovi v boji proti banditům a odhalil svou moudrost a sílu.'
  },
  {
    title: 'Bitva o Sodden',
    description: 'Druhá bitva o Sodden byla klíčovým střetem mezi Nilfgaardem a Severními královstvími. Čarodějky jako Yennefer a Triss sehrály zásadní roli.'
  },
  {
    title: 'Kaer Morhen',
    description: 'Sídlo zaklínačů školy Vlka, kde byli Geralt a Vesemir vycvičeni. Pevnost byla zničena při útoku fanatiků.'
  },
  {
    title: 'Ciri, Dítě překvapení',
    description: 'Cirilla z Cintry, známá jako Ciri, je dědičkou Starší krve. Její osud je propletený s Geraltem a Divokým honem.'
  },
  {
    title: 'Nilfgaardská říše',
    description: 'Nilfgaard je mocná jižní říše, která expanduje na sever. Vede války proti Temerii a Redanii pod vedením císaře Emhyra.'
  },
  {
    title: 'Divoký hon',
    description: 'Divoký hon je skupina spektrálních jezdců z jiného světa, kteří unášejí lidi a hledají Ciri kvůli její moci.'
  },
  {
    title: 'Beltayn',
    description: 'Svátek lásky a plodnosti slavený na jaře. Lidé tančí kolem ohňů a věnují dary bohyni Melitele.'
  },
  {
    title: 'Škola Vlka',
    description: 'Jedna z nejslavnějších zaklínačských škol, sídlící v Kaer Morhen. Vychovala Geralta, Vesemira a Lamberta.'
  },
  {
    title: 'Conjunction of the Spheres',
    description: 'Katastrofická událost, při níž se prolínají světy, přinesla monstra a magii do světa lidí.'
  },
  {
    title: 'Yennefer z Vengerbergu',
    description: 'Mocná čarodějka, Geraltova láska a adoptivní matka Ciri. Známá svou inteligencí a tvrdohlavostí.'
  },
  {
    title: 'Velen',
    description: 'Bažinatá oblast plná bíd a příšer. Ovládána Krvavým baronem, je domovem utopenců a bab.'
  },
  {
    title: 'Novigrad',
    description: 'Největší město světa, centrum obchodu a náboženství Věčného ohně. Plné intrik a zločinu.'
  },
  {
    title: 'Skellige',
    description: 'Souostroví vikingů známé drsnou kulturou a uctíváním bohyně Freyy. Domov klanů jako an Craite.'
  },
  {
    title: 'Eredin, král Divokého honu',
    description: 'Vůdce Divokého honu, elf Aen Elle, který chce zajmout Ciri a použít její moc k záchraně svého světa.'
  },
  {
    title: 'Triss Merigold',
    description: 'Čarodějka ze školy v Aretuze, blízká přítelkyně Geralta a Ciri. Známá svou ohnivou magií.'
  },
  {
    title: 'Dandelion',
    description: 'Slavný bard a Geraltův přítel, jehož básně a písně šíří pověst o zaklínači po celém světě.'
  },
  {
    title: 'Temerie',
    description: 'Jedno z nejmocnějších Severních království, domov Foltesta. Často terčem nilfgaardských invazí.'
  },
  {
    title: 'Redanie',
    description: 'Království vedené králem Radovidem, známé svou špionážní sítí pod vedením Dijkstry.'
  },
  {
    title: 'Oxenfurt',
    description: 'Univerzitní město v Redanii, centrum vzdělání a kultury. Domov mnoha učenců a básníků.'
  },
  {
    title: 'Gwent',
    description: 'Populární karetní hra hraná po hospodách i dvorech. Každá frakce má své unikátní karty.'
  },
  {
    title: 'Melitele',
    description: 'Bohyně plodnosti a mateřství, uctívaná v chrámech po celém světě. Často spojována s láskou.'
  },
  {
    title: 'Starší krev',
    description: 'Mocná magická linie elfů, která dává Ciri schopnost cestovat mezi světy a časem.'
  },
  {
    title: 'Keira Metz',
    description: 'Čarodějka a bývalá poradkyně krále Foltesta, známá svou krásou a alchymistickými schopnostmi.'
  },
  {
    title: 'Toussaint',
    description: 'Vévodství v Nilfgaardu, známé svými vinicemi a rytířskou kulturou. Domov vyšších vampýrů.'
  },
  {
    title: 'Zerrikanie',
    description: 'Daleká země na východě, domov bojovnic a draků. Známá svými exotickými zbraněmi.'
  },
  {
    title: 'Vesemir',
    description: 'Nejstarší zaklínač školy Vlka, mentor Geralta a otcovská figura pro Ciri.'
  },
  {
    title: 'Roach',
    description: 'Geraltův věrný kůň, pojmenovaný po kobylce. Provází ho na všech jeho dobrodružstvích.'
  },
  {
    title: 'Aretuza',
    description: 'Magická škola na ostrově Thanedd, kde se vzdělávají čarodějky jako Yennefer a Triss.'
  },
  {
    title: 'Krvavý baron',
    description: 'Vůdce Velen, tragická postava s temnou minulostí. Bojuje s rodinnými problémy a alkoholem.'
  },
  {
    title: 'Dettlaff',
    description: 'Vyšší vampýr z Toussaint, známý svou loajalitou, ale i nekontrolovatelnou zuřivostí.'
  },
  {
    title: 'Pellar',
    description: 'Věštec a léčitel z Velen, který pomáhá místním s kletbami a nemocemi.'
  },
  {
    title: 'Saovine',
    description: 'Svátek mrtvých slavený na podzim, kdy se prolínají světy a duchové jsou aktivní.'
  },
  {
    title: 'Korred',
    description: 'Lesní tvor, který chrání přírodu a trestá vetřelce v Toussaint.'
  },
  {
    title: 'Philippa Eilhart',
    description: 'Mocná čarodějka a vůdkyně Lóže čarodějek, známá svými intrikami a proměnou v sovu.'
  }
];

function LoreWidget() {
  const [currentLore, setCurrentLore] = useState(null);

  const selectDailyLore = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const seed = today.split('-').reduce((acc, val) => acc + parseInt(val), 0);
    const index = seed % loreData.length; // Deterministický výběr podle data
    setCurrentLore(loreData[index]);
  };

  const selectRandomLore = () => {
    const randomIndex = Math.floor(Math.random() * loreData.length); // Náhodný výběr
    setCurrentLore(loreData[randomIndex]);
  };

  useEffect(() => {
    selectDailyLore(); // Inicializace denním příběhem
    const interval = setInterval(selectDailyLore, 24 * 60 * 60 * 1000); // Každý den
    return () => clearInterval(interval);
  }, []);

  if (!currentLore) {
    return (
      <div style={widgetStyle}>
        <p style={textStyle}>Načítám příběh...</p>
      </div>
    );
  }

  return (
    <div style={widgetStyle}>
      <h2 style={titleStyle}>Zaklínačský příběh 📜</h2>
      <div key={currentLore.title} style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
        <p style={textStyle}><strong>{currentLore.title}</strong></p>
        <p style={textStyle}>{currentLore.description}</p>
        <button
          onClick={selectRandomLore}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#a11212')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#8b0000')}
        >
          Další příběh
        </button>
      </div>
    </div>
  );
}

const widgetStyle = {
  backgroundColor: '#2b1e16',
  color: '#e0d8c3',
  padding: '1rem',
  borderRadius: '8px',
  border: '2px solid #d4a017',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  fontFamily: "'Mystery Quest', cursive",
  maxWidth: '100%',
  boxSizing: 'border-box',
};

const titleStyle = {
  margin: '0 0 0.5rem',
  fontSize: '1.5rem',
  color: '#d4a017',
  textAlign: 'center',
};

const textStyle = {
  margin: '0.5rem 0',
  fontSize: '1rem',
  color: '#e0d8c3',
  lineHeight: '1.4',
};

const buttonStyle = {
  backgroundColor: '#8b0000',
  color: '#e0d8c3',
  border: '1px solid #d4a017',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontFamily: "'Mystery Quest', cursive",
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

export default LoreWidget;