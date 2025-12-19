import React, { useState } from 'react';
import { monsters } from './monsters';

function BestiaryWidget() {
  const [currentMonster, setCurrentMonster] = useState(
    monsters[Math.floor(Math.random() * monsters.length)]
  );

  const changeMonster = () => {
    setCurrentMonster(monsters[Math.floor(Math.random() * monsters.length)]);
  };

  return (
    <div style={widgetStyle}>
      <h2 style={titleStyle}>Bestiář 🧌</h2>
      <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
        <p style={textStyle}><strong>Jméno:</strong> {currentMonster.name}</p>
        <p style={textStyle}><strong>Popis:</strong> {currentMonster.description}</p>
        <p style={textStyle}><strong>Slabiny:</strong> {currentMonster.weaknesses}</p>
        <p style={textStyle}><strong>Kategorie:</strong> {currentMonster.category}</p>
        <button
          onClick={changeMonster}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#a11212')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#8b0000')}
        >
          Další příšera
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

export default BestiaryWidget;