import React from 'react';

export default function MenuPrincipal({ onJouer }) {
  return (
    <div className="menu-principal">
      <h1>EPSIA</h1>
      <h2>Éradication Planifiée par Système d’IA</h2>
      <button onClick={onJouer}>▶ Jouer</button>
      <button>⚙ Options</button>
    </div>
  );
}