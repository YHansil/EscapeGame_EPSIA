// src/components/CarteMission.jsx
import React from "react";
import "../styles/ui.css"; // pour les styles des cercles rouges

/**
 * Composant CarteMission
 * Affiche la carte du monde avec deux zones interactives :
 * - Kremlin (209, 137)
 * - Taj Mahal (395, 280)
 */
export default function CarteMission({ onMissionSelect }) {
  // Fonction qui gère le clic sur une zone
  const handleClick = (mission) => {
    onMissionSelect(mission);
  };

  return (
    <div className="carte-mission-container">
      {/* Image principale de la carte */}
      <img
        src="/image/image_post_mission/carte_des_mission.png"
        alt="Carte des missions"
        className="carte-image"
      />

      {/* Zone 1 : Kremlin */}
      <div
        className="zone-mission"
        style={{ left: "209px", top: "137px" }}
        onClick={() => handleClick("kremlin")}
      >
        <div className="zone-cercle"></div>
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

      {/* Zone 2 : Taj Mahal (inactive pour cette version) */}
      <div
        className="zone-mission disabled"
        style={{ left: "395px", top: "280px" }}
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
