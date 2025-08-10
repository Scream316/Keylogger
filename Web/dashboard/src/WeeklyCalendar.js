import React, { useEffect, useState } from 'react';

// Vaše Client ID z Google Cloud Console
const CLIENT_ID = '7959885563-lqcih6ihserisjjsr3iar4rqo2c50tmb.apps.googleusercontent.com';

// Požadovaná oprávnění
const SCOPES = 'https://www.googleapis.com/auth/calendar';

function WeeklyCalendar() {
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState(null);
  const [tokenClient, setTokenClient] = useState(null);

  // Zde budeme uchovávat access token (není ve state, aby se minimalizovalo rerenderování)
  let accessToken = null;

  useEffect(() => {
    // 1. Dynamické načtení Google API klienta (gapi) skriptu
    function loadGapiClient() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          window.gapi.load('client', resolve);
        };
        script.onerror = () => reject('Nepodařilo se načíst gapi klienta');
        document.body.appendChild(script);
      });
    }

    // 2. Inicializace gapi klienta s Calendar API
    async function initGapiClient() {
      await window.gapi.client.init({
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });
      // Nemusíme nastavovat API Key, protože používáme OAuth token
    }

    // 3. Inicializace token klienta Google Identity Services
    function initTokenClient() {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        setError('Google Identity Services SDK není načtené');
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        prompt: '', // necháme prázdné, takže přihlášení přes prompt se zobrazí jen pokud není token platný
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            console.error('Chyba při zisku tokenu:', tokenResponse);
            setError('Chyba při získání tokenu: ' + tokenResponse.error);
            return;
          }
          accessToken = tokenResponse.access_token;
          setIsSignedIn(true);
          setError(null);
          // Nastav token v gapi klientu
          window.gapi.client.setToken({ access_token: accessToken });
          listUpcomingEvents();
        },
      });

      setTokenClient(client);
    }

    // Spustíme načtení a inicializaci
    loadGapiClient()
      .then(() => initGapiClient())
      .then(() => {
        // Načteme Google Identity Services SDK (pokud ještě není)
        if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
          const gisScript = document.createElement('script');
          gisScript.src = 'https://accounts.google.com/gsi/client';
          gisScript.onload = () => initTokenClient();
          gisScript.onerror = () => setError('Nepodařilo se načíst Google Identity Services SDK');
          document.body.appendChild(gisScript);
        } else {
          initTokenClient();
        }
      })
      .catch((err) => {
        console.error(err);
        setError(typeof err === 'string' ? err : JSON.stringify(err));
      });
  }, []);

  // Funkce pro spuštění přihlášení / získání access tokenu
  const handleAuthClick = () => {
    if (!tokenClient) {
      setError('Token client není připraven, zkuste prosím znovu načíst stránku');
      return;
    }

    // Pokud už máme token a user je "signed in", můžeme zkusit získat token s promptem 'none' (tichý refresh)
    if (isSignedIn && accessToken) {
      // Zkusit obnovit token bez zobrazení dialogu
      tokenClient.requestAccessToken({ prompt: '' });
    } else {
      // Požádat uživatele o povolení - template prompt lze zde vynechat nebo např. 'consent'
      tokenClient.requestAccessToken({ prompt: 'consent' });
    }
  };

  // Odhlášení = vymazání tokenu a reset stavu
  const handleSignOutClick = () => {
    accessToken = null;
    window.gapi.client.setToken(null);
    setIsSignedIn(false);
    setEvents([]);
    setError(null);
  };

  // Načtení nadcházejících událostí z Google Kalendáře
  const listUpcomingEvents = () => {
    setLoadingEvents(true);
    setError(null);

    const now = new Date();
    const timeMin = now.toISOString();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const timeMax = nextWeek.toISOString();

    window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    })
      .then(response => {
        const items = response.result.items || [];
        setEvents(items);
        setLoadingEvents(false);
      })
      .catch(err => {
        console.error('Chyba při načítání událostí:', err);
        setError('Nepodařilo se načíst události');
        setLoadingEvents(false);
      });
  };

  return (
    <section style={{
      backgroundColor: '#4b3221',
      padding: '1rem',
      borderRadius: 8,
      color: '#d9b382',
      maxWidth: 400,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: '1rem auto'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Události tento týden</h2>

      {!isSignedIn ? (
        <>
          <button
            onClick={handleAuthClick}
            style={{
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: 4,
              backgroundColor: '#7a4f24',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              width: '100%',
              fontSize: '1rem'
            }}
          >
            Přihlásit se ke Google Kalendáři
          </button>
          {error && <p style={{ color: 'tomato', marginTop: '1rem' }}>{error}</p>}
        </>
      ) : (
        <>
          <button
            onClick={handleSignOutClick}
            style={{
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: 4,
              backgroundColor: '#7a4f24',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '1rem',
              width: '100%',
              fontSize: '1rem'
            }}
          >
            Odhlásit se
          </button>

          {loadingEvents ? (
            <p>Načítám události...</p>
          ) : error ? (
            <p style={{ color: 'tomato' }}>{error}</p>
          ) : events.length === 0 ? (
            <p>Žádné nadcházející události za týden.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {events.map(event => (
                <li
                  key={event.id}
                  style={{
                    marginBottom: '0.8rem',
                    borderBottom: '1px solid #7a4f24',
                    paddingBottom: '0.5rem'
                  }}
                >
                  <strong>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</strong><br />
                  {event.summary || '(bez názvu)'}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default WeeklyCalendar;
