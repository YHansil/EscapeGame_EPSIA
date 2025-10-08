import React, { useState } from 'react';
import MenuPrincipal from './components/MenuPrincipal';
import CarteMission from './components/CarteMission';
import EcranEnigme from './components/EcranEnigme';

export default function App() {
  const [etatJeu, setEtatJeu] = useState('menu'); // menu | carte | enigmes
  const [mission, setMission] = useState(null);

  const demarrerJeu = () => setEtatJeu('carte');
  const lancerMission = (zone) => {
    setMission(zone);
    setEtatJeu('enigmes');
  };

  return (
    <div className="app-container">
      {etatJeu === 'menu' && <MenuPrincipal onJouer={demarrerJeu} />}
      {etatJeu === 'carte' && <CarteMission onMissionSelect={lancerMission} />}
      {etatJeu === 'enigmes' && <EcranEnigme mission={mission} />}
    </div>
  );
}