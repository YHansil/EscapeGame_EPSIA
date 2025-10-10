import React, { useState } from "react";
import { JournalProvider } from "./context/JournalContext";
import { TimerProvider } from "./context/TimerContext";
import MenuPrincipal from "./components/MenuPrincipal";
import CarteMission from "./components/CarteMission";
import EcranEnigme from "./components/EcranEnigme";
import JournalDeBord from "./components/JournalDeBord";

export default function App() {
  const [etatJeu, setEtatJeu] = useState("menu");
  const [mission, setMission] = useState(null);
  const [missionsTerminees, setMissionsTerminees] = useState([]);

  const demarrerJeu = () => setEtatJeu("carte");

  const lancerMission = (zone) => {
    setMission(zone);
    setEtatJeu("enigmes");
  };

  const terminerMission = (missionFinie) => {
    setMissionsTerminees((prev) => [...prev, missionFinie]);
    setEtatJeu("carte");
  };

  return (
    <JournalProvider>
      <TimerProvider>
        <div className="app-container">
          {etatJeu === "menu" && <MenuPrincipal onJouer={demarrerJeu} />}
          {etatJeu === "carte" && (
            <CarteMission
              onMissionSelect={lancerMission}
              missionsTerminees={missionsTerminees}
            />
          )}
          {etatJeu === "enigmes" && (
            <EcranEnigme mission={mission} onMissionComplete={terminerMission} />
          )}
          <JournalDeBord />
        </div>
      </TimerProvider>
    </JournalProvider>
  );
}