// Importations principales
import React, { useState } from "react";
import MenuPrincipal from "./components/MenuPrincipal";
import CarteMission from "./components/CarteMission";
import EcranEnigme from "./components/EcranEnigme";
import JournalDeBord from "./components/JournalDeBord"; // ✅ Journal global

export default function App() {
  // --- 🎮 ÉTATS DU JEU ---
  const [etatJeu, setEtatJeu] = useState("menu"); // menu | carte | enigmes
  const [mission, setMission] = useState(null);   // mission active
  const [missionsTerminees, setMissionsTerminees] = useState([]); // ✅ liste des missions réussies

  // --- 🚀 FONCTIONS DE NAVIGATION ---
  const demarrerJeu = () => setEtatJeu("carte");

  const lancerMission = (zone) => {
    setMission(zone);
    setEtatJeu("enigmes");
  };

  // ✅ Quand une mission est terminée (appelée par EcranEnigme)
  const terminerMission = (missionFinie) => {
    setMissionsTerminees((prev) => [...prev, missionFinie]);
    setEtatJeu("carte"); // retourne à la carte
  };

  // --- 🧩 AFFICHAGE GLOBAL ---
  return (
    <div className="app-container">
      {etatJeu === "menu" && <MenuPrincipal onJouer={demarrerJeu} />}
      {etatJeu === "carte" && (
        <CarteMission
          onMissionSelect={lancerMission}
          missionsTerminees={missionsTerminees} // ✅ passe la liste à la carte
        />
      )}
      {etatJeu === "enigmes" && (
        <EcranEnigme mission={mission} onMissionComplete={terminerMission} />
      )}

      {/* 🧾 Fenêtre globale du Journal toujours visible */}
      <JournalDeBord />
    </div>
  );
}
