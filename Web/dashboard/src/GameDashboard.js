import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const SHEET_CSV_URLS = [
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=800022916',
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=1184089217', 
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=384319869',
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=1023475303',
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=1361395184',
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=0',
  'https://docs.google.com/spreadsheets/d/1iU4dVup75JY8997a-LNJ2J-xOkXG7dTn5qDCDBt9mZw/export?format=csv&gid=1159001269',

]; 

const PLATFORM_LOGOS = {
  PS4: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg',
  PS5: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg',
  SWITCH: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Nintendo_Switch_logo.svg',
  EPIC: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg',
  STEAM: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
  PC: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Computer.svg',
  GOG: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/GOG.com_logo.svg'
};

function PlatformCountBox({ platform, count, logoUrl }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      backgroundColor: 'rgba(122, 79, 36, 0.85)',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      color: '#f3e9d2',
      fontWeight: '700',
      fontSize: '1.2rem',
      minWidth: '180px',
    }}>
      <img src={logoUrl} alt={`${platform} logo`} style={{ width: 40, height: 40, objectFit: 'contain' }} />
      <div>
        {platform}: {count !== null ? count : '—'}
      </div>
    </div>
  );
}

function GameDashboard() {
  const [counts, setCounts] = useState({
    PS4: null,
    PS5: null,
    SWITCH: null,
    EPIC: null,
    STEAM: null,
    PC: null,
    GOG: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all(
      SHEET_CSV_URLS.map(url =>
        fetch(url)
          .then(res => res.text())
          .then(csvText => Papa.parse(csvText, { header: true }).data)
      )
    )
    .then(allSheetsData => {
      // spojíme všechna data do jednoho pole
      const combinedData = allSheetsData.flat();

      // funkce na normalizaci (velká písmena, trim)
      const normalize = str => str?.trim().toUpperCase();

      // inicializace počítadel
      const platformCounts = {
        PS4: 0,
        PS5: 0,
        SWITCH: 0,
        EPIC: 0,
        STEAM: 0,
        PC: 0,
        GOG: 0,
      };

      combinedData.forEach(row => {
        if (!row.Platform) return; // pokud není platforma, přeskočit
        const plat = normalize(row.Platform);
        if (platformCounts.hasOwnProperty(plat)) {
          platformCounts[plat]++;
        }
      });

      setCounts(platformCounts);
      setLoading(false);
    })
    .catch(err => {
      setError('Chyba při načítání dat');
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Načítám data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      padding: '2rem',
      backgroundColor: '#2e1a0f',
      color: '#f3e9d2',
      fontFamily: "'Mystery Quest', cursive, bold",
    }}>
      {Object.entries(counts).map(([platform, count]) => (
        <PlatformCountBox
          key={platform}
          platform={platform}
          count={count}
          logoUrl={PLATFORM_LOGOS[platform]}
        />
      ))}
    </div>
  );
}

export default GameDashboard;
