// src/components/CarteMission.jsx
import React from "react";
import "../styles/ui.css"; // pour les styles des cercles rouges

/**
 * Composant CarteMission
 * Affiche la carte du monde avec deux zones interactives :
 * - Kremlin (209, 137)
 * - Taj Mahal (395, 280)
 */
export default function CarteMission({ onMissionSelect, missionsTerminees = [] }) {
  // Fonction qui gère le clic sur une zone
  const handleClick = (mission) => {
    // Empêche le clic si la mission est déjà terminée
    if (!missionsTerminees.includes(mission)) {
      onMissionSelect(mission);
    }
  };

  return (
    <div className="carte-mission-container">
      {/* Image principale de la carte */}
      <img
        src="/image/image_post_mission/carte_des_mission.png"
        alt="Carte des missions"
        className="carte-image"
      />

      {/* === Zone 1 : Kremlin === */}
      <div
        className={`zone-mission ${
          missionsTerminees.includes("kremlin") ? "mission-terminee" : ""
        }`}
        style={{
          left: "33%",
          top: "33%",
          position: "absolute", // ✅ pour bien ancrer sur la carte
        }}
        onClick={() => handleClick("kremlin")}
      >
        <div className="zone-cercle"></div>

        {/* ✅ Badge “Mission réussie” bien positionné */}
        {missionsTerminees.includes("kremlin") && (
          <div className="mission-status" style={{ top: "-45px", left: "50%" }}>
            ✔ Mission réussie
          </div>
        )}

        <div className="zone-tooltip">
          🧭 <strong>Mission : Opération Alpha Root</strong>
          <br />
          📍 Zone : <b>Kremlin — Secteur verrouillé</b>
          <br />
          Objectif :
          <br />
          Infiltrer la zone et collecter les fragments nécessaires à la
          localisation d’ARC.
          <br />
          <br />
          Énigmes à résoudre :
          <br />
          1️⃣ Reconstituer le symbole perdu.
          <br />
          2️⃣ Déchiffrer la séquence numérique.
          <br />
          3️⃣ Interpréter le code dissimulé.
          <br />
          <br />
          Risque : Activité IA détectée.
          <br />
          Conseil : Observe. Analyse. Agis avec logique.
        </div>
      </div>

      {/* === Zone 2 : Taj Mahal === */}
      <div
        className="zone-mission disabled"
        style={{ left: "50%", top: "65%", position: "absolute" }}
      >
        <div className="zone-cercle"></div>
        <div className="zone-tooltip">
          🧭 <strong>Mission : Opération Longitude</strong>
          <br />
          📍 Zone : Taj Mahal — Non disponible dans cette version.
        </div>
      </div>
    </div>
  );
}
