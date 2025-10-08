import React, { useState } from 'react';
import Enigme1 from './enigmes/Enigme1';
import Enigme2 from './enigmes/Enigme2';
import Enigme3 from './enigmes/Enigme3';

export default function EcranEnigme({ mission }) {
  const [etape, setEtape] = useState(1);
  const avancer = () => setEtape(etape + 1);

  return (
    <div className="ecran-enigme">
      {etape === 1 && <Enigme1 onComplete={avancer} />}
      {etape === 2 && <Enigme2 onComplete={avancer} />}
      {etape === 3 && <Enigme3 onComplete={avancer} />}
    </div>
  );
}