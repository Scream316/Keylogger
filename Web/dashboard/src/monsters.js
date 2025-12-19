export const monsters = [
    {
      name: 'Abaya',
      description: 'Vodní příšera podobná obrovskému hadovi, často číhá v močálech.',
      weaknesses: 'Igni, oleje proti vodním tvorům',
      category: 'Necrophages',
      conditions: { weather: ['rain'], time: ['day', 'night'] }
    },
    {
      name: 'Alghoul',
      description: 'Silnější verze ghůla, agresivní a odolná.',
      weaknesses: 'Necrophage oil, Axii',
      category: 'Necrophages',
      conditions: { weather: ['any'], time: ['day', 'night'] }
    },
    {
      name: 'Arachas',
      description: 'Obrovský pavouk s jedovatými útoky.',
      weaknesses: 'Insectoid oil, Golden Oriole',
      category: 'Insectoids',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Banshee',
      description: 'Duch ženy, jejíž křik může zabíjet.',
      weaknesses: 'Specter oil, Yrden',
      category: 'Specters',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Basilisk',
      description: 'Plaz s jedovatým dechem a smrtícím pohledem.',
      weaknesses: 'Draconid oil, Aard',
      category: 'Draconids',
      conditions: { weather: ['sunny'], time: ['day'] }
    },
    {
      name: 'Bear',
      description: 'Mohutný medvěd, často v lesích.',
      weaknesses: 'Beast oil, Quen',
      category: 'Beasts',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Berserker',
      description: 'Člověk proměněný v medvěda pomocí kletby.',
      weaknesses: 'Cursed oil, Igni',
      category: 'Cursed Ones',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Botchling',
      description: 'Prokleté dítě, které se proměnilo v monstrum.',
      weaknesses: 'Cursed oil, Axii',
      category: 'Cursed Ones',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Bruxa',
      description: 'Vampýrka s hypnotickým hlasem a rychlými útoky.',
      weaknesses: 'Vampire oil, Black Blood',
      category: 'Vampires',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Cockatrice',
      description: 'Létající drakonid s kamenícím pohledem.',
      weaknesses: 'Draconid oil, Aard',
      category: 'Draconids',
      conditions: { weather: ['sunny'], time: ['day'] }
    },
    {
      name: 'Cyclops',
      description: 'Obrovský jednooký obr, velmi silný.',
      weaknesses: 'Ogroid oil, Quen',
      category: 'Ogroids',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Dagon',
      description: 'Mytická vodní příšera uctívaná jako bůh.',
      weaknesses: 'Igni, oleje proti vodním tvorům',
      category: 'Relicts',
      conditions: { weather: ['rain'], time: ['night'] }
    },
    {
      name: 'Djinn',
      description: 'Mocný duch vázaný na předměty, ovládá elementy.',
      weaknesses: 'Dimeritium, Yrden',
      category: 'Elementa',
      conditions: { weather: ['wind'], time: ['night'] }
    },
    {
      name: 'Drowner',
      description: 'Utopenci číhající u vody, útočí ve skupinách.',
      weaknesses: 'Necrophage oil, Igni',
      category: 'Necrophages',
      conditions: { weather: ['rain'], time: ['day', 'night'] }
    },
    {
      name: 'Ekimma',
      description: 'Rychlý a smrtící vampýr.',
      weaknesses: 'Vampire oil, Black Blood',
      category: 'Vampires',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Elemental (Earth)',
      description: 'Kamenný tvor vytvořený magií.',
      weaknesses: 'Dimeritium, Aard',
      category: 'Elementa',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Elemental (Fire)',
      description: 'Ohnivý tvor, který spaluje vše kolem.',
      weaknesses: 'Dimeritium, Northern Wind',
      category: 'Elementa',
      conditions: { weather: ['hot'], time: ['day'] }
    },
    {
      name: 'Elemental (Ice)',
      description: 'Ledový tvor z chladných oblastí.',
      weaknesses: 'Dimeritium, Igni',
      category: 'Elementa',
      conditions: { weather: ['cold'], time: ['night'] }
    },
    {
      name: 'Erynia',
      description: 'Krvelačná harpyje, létá ve skupinách.',
      weaknesses: 'Hybrid oil, Aard',
      category: 'Hybrids',
      conditions: { weather: ['wind'], time: ['night'] }
    },
    {
      name: 'Fiend',
      description: 'Obrovský rohatý tvor s hypnotickým pohledem.',
      weaknesses: 'Relict oil, Samum',
      category: 'Relicts',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Foglet',
      description: 'Příšera číhající v mlze, mizí a objevuje se.',
      weaknesses: 'Necrophage oil, Quen',
      category: 'Necrophages',
      conditions: { weather: ['rain'], time: ['night'] }
    },
    {
      name: 'Forktail',
      description: 'Drakonid s rozdvojeným ocasem.',
      weaknesses: 'Draconid oil, Grapeshot',
      category: 'Draconids',
      conditions: { weather: ['sunny'], time: ['day'] }
    },
    {
      name: 'Frightener',
      description: 'Obrovský tvor podobný kyklopovi.',
      weaknesses: 'Ogroid oil, Quen',
      category: 'Ogroids',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Gargoyle',
      description: 'Kamenný tvor oživený magií.',
      weaknesses: 'Dimeritium, Aard',
      category: 'Elementa',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Ghoul',
      description: 'Mrchožrout útočící ve skupinách.',
      weaknesses: 'Necrophage oil, Igni',
      category: 'Necrophages',
      conditions: { weather: ['any'], time: ['day', 'night'] }
    },
    {
      name: 'Godling',
      description: 'Malý přátelský duch, často v lesích.',
      weaknesses: 'Specter oil, Yrden',
      category: 'Relicts',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Golem',
      description: 'Obrovský magický konstrukt z hlíny nebo kamene.',
      weaknesses: 'Dimeritium, Quen',
      category: 'Elementa',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Grave Hag',
      description: 'Příšera číhající na hřbitovech.',
      weaknesses: 'Necrophage oil, Yrden',
      category: 'Necrophages',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Griffin',
      description: 'Létající tvor s tělem lva a hlavou orla.',
      weaknesses: 'Hybrid oil, Aard',
      category: 'Hybrids',
      conditions: { weather: ['wind'], time: ['day'] }
    },
    {
      name: 'Hagubman',
      description: 'Vodní příšera podobná utopenci.',
      weaknesses: 'Necrophage oil, Igni',
      category: 'Necrophages',
      conditions: { weather: ['rain'], time: ['day', 'night'] }
    },
    {
      name: 'Harpy',
      description: 'Létající tvor s ostrými drápy.',
      weaknesses: 'Hybrid oil, Aard',
      category: 'Hybrids',
      conditions: { weather: ['wind'], time: ['day'] }
    },
    {
      name: 'Hound of the Wild Hunt',
      description: 'Ledový pes Divokého honu.',
      weaknesses: 'Elementa oil, Igni',
      category: 'Elementa',
      conditions: { weather: ['cold'], time: ['night'] }
    },
    {
      name: 'Ifrit',
      description: 'Ohnivý démon z pouští Zerrikanie.',
      weaknesses: 'Dimeritium, Northern Wind',
      category: 'Elementa',
      conditions: { weather: ['hot'], time: ['day'] }
    },
    {
      name: 'Katakan',
      description: 'Vyšší vampýr s neviditelností.',
      weaknesses: 'Vampire oil, Moon Dust',
      category: 'Vampires',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Kerberon',
      description: 'Vzácný vampýr s rychlými útoky.',
      weaknesses: 'Vampire oil, Black Blood',
      category: 'Vampires',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Kikimore',
      description: 'Obrovský hmyz žijící pod zemí.',
      weaknesses: 'Insectoid oil, Golden Oriole',
      category: 'Insectoids',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Leshen',
      description: 'Lesní duch ovládající rostliny a zvířata.',
      weaknesses: 'Relict oil, Igni',
      category: 'Relicts',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Manticore',
      description: 'Jedovatý tvor s tělem lva a ocasem štíra.',
      weaknesses: 'Draconid oil, Golden Oriole',
      category: 'Draconids',
      conditions: { weather: ['hot'], time: ['day'] }
    },
    {
      name: 'Nekker',
      description: 'Malý agresivní tvor žijící v podzemí.',
      weaknesses: 'Ogroid oil, Northern Wind',
      category: 'Ogroids',
      conditions: { weather: ['any'], time: ['day', 'night'] }
    },
    {
      name: 'Nightwraith',
      description: 'Duch ženy vázaný na měsíční svit.',
      weaknesses: 'Specter oil, Yrden',
      category: 'Specters',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Noonwraith',
      description: 'Duch ženy vázaný na sluneční svit.',
      weaknesses: 'Specter oil, Yrden',
      category: 'Specters',
      conditions: { weather: ['sunny'], time: ['day'] }
    },
    {
      name: 'Rotfiend',
      description: 'Mrchožrout, který exploduje při smrti.',
      weaknesses: 'Necrophage oil, Aard',
      category: 'Necrophages',
      conditions: { weather: ['any'], time: ['day', 'night'] }
    },
    {
      name: 'Shaelmaar',
      description: 'Obrovský podzemní tvor citlivý na zvuk.',
      weaknesses: 'Relict oil, Aard',
      category: 'Relicts',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Siren',
      description: 'Vodní tvor lákající oběti svým zpěvem.',
      weaknesses: 'Hybrid oil, Igni',
      category: 'Hybrids',
      conditions: { weather: ['rain'], time: ['day', 'night'] }
    },
    {
      name: 'Sylvan',
      description: 'Lesní tvor podobný satyrovi.',
      weaknesses: 'Relict oil, Igni',
      category: 'Relicts',
      conditions: { weather: ['any'], time: ['day'] }
    },
    {
      name: 'Troll',
      description: 'Velký, ale často přátelský obr.',
      weaknesses: 'Ogroid oil, Quen',
      category: 'Ogroids',
      conditions: { weather: ['any'], time: ['day', 'night'] }
    },
    {
      name: 'Vampire (Higher)',
      description: 'Mocný vampýr s lidskou podobou.',
      weaknesses: 'Vampire oil, Black Blood',
      category: 'Vampires',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Water Hag',
      description: 'Příšera číhající u vody, podobná utopenci.',
      weaknesses: 'Necrophage oil, Igni',
      category: 'Necrophages',
      conditions: { weather: ['rain'], time: ['day', 'night'] }
    },
    {
      name: 'Werewolf',
      description: 'Prokletý člověk proměněný ve vlka.',
      weaknesses: 'Cursed oil, Moon Dust',
      category: 'Cursed Ones',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Wolf',
      description: 'Divoký vlk útočící ve smečkách.',
      weaknesses: 'Beast oil, Aard',
      category: 'Beasts',
      conditions: { weather: ['any'], time: ['day', 'night'] }
    },
    {
      name: 'Wraith',
      description: 'Obecný duch vázaný na kletby.',
      weaknesses: 'Specter oil, Yrden',
      category: 'Specters',
      conditions: { weather: ['any'], time: ['night'] }
    },
    {
      name: 'Wyvern',
      description: 'Létající drakonid, menší než drak.',
      weaknesses: 'Draconid oil, Aard',
      category: 'Draconids',
      conditions: { weather: ['sunny'], time: ['day'] }
    }
  ];