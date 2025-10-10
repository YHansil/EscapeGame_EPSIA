import React, { useState } from 'react';
import Enigme1 from './enigmes/Enigme1';
import Enigme2 from './enigmes/Enigme2';
import Enigme3 from './enigmes/Enigme3';

export default function EcranEnigme({ mission, onMissionComplete }) {
  const [etape, setEtape] = useState(1);

  const avancer = () => setEtape(etape + 1);

  // ✅ Quand la dernière énigme est terminée
  const terminerMission = () => {
    onMissionComplete(mission); // renvoie au parent (App)
  };

  return (
    <div className="ecran-enigme">
      {etape === 1 && <Enigme1 onComplete={avancer} />}
      {etape === 2 && <Enigme2 onComplete={avancer} />}
      {etape === 3 && <Enigme3 onComplete={terminerMission} />} {/* ✅ */}
    </div>
  );
}
