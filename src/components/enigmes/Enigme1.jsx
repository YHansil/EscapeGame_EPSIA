// src/components/enigmes/Enigme1.jsx
import React, { useState } from "react";
import PuzzleImage from "../PuzzleImage";

export default function Enigme1({ onComplete }) {
  const [isPuzzleDone, setPuzzleDone] = useState(false);
  const [valeur, setValeur] = useState("");
  const [message, setMessage] = useState("");
  const [journal, setJournal] = useState([
    "ÉNIGME 1 — LE SCEAU DE LA SPASSKAÏA",
    "(Kremlin, Moscou – Première clé de la latitude)",
  ]);

  // Quand le puzzle est terminé
  const handlePuzzleResolved = () => {
    if (!isPuzzleDone) {
      setPuzzleDone(true);
      const audio = new Audio("..../public/audio/audio_enigme1/audio_puzzle_resolu.mp3");
      audio.play();
      setJournal((prev) => [
        ...prev,
        'ARC: "La Tour du Temps détient la Clé du Pouvoir. Ma clé bat selon un cycle que tu ne comprendras jamais."',
        "Journal : Convertis-la en minutes et brise-la avec La Clef. Notre agent de liaison a constaté que le cycle dure 10h57.",
      ]);
    }
  };

  const verifier = () => {
    if (parseInt(valeur) === 73) {
      const successSound = new Audio("/audio/audio_post_mission/audio_metalique1.mp3");
      successSound.play();
      setMessage("✅ Première partie de la latitude récupérée : 73° !");
      setJournal((prev) => [
        ...prev,
        "📡 Donnée confirmée. Alpha ROOT a débloqué le premier verrou du système ARC.",
      ]);
      setTimeout(() => onComplete(), 2500);
    } else {
      setMessage("❌ Mauvaise réponse, la détection d’ARC augmente de 5%...");
      setJournal((prev) => [
        ...prev,
        "⚠️ Anomalie détectée... chaque erreur attire l’attention d’ARC.",
      ]);
    }
  };

  return (
    <div className="enigme-container">
      <h2>ÉNIGME 1 — LE SCEAU DE LA SPASSKAÏA</h2>
      <p>
        {isPuzzleDone
          ? "Puzzle complété — observe la Tour Spasskaïa et poursuis ta mission."
          : "Reconstitue le puzzle pour révéler la Tour Spasskaïa."}
      </p>

      {/* Puzzle reste toujours visible */}
      <PuzzleImage
        imageSrc="/image/image_enigme1/image_tour.png"
        onResolve={handlePuzzleResolved}
      />

      {/* Une fois le puzzle fini, on affiche les sous-titres et champ de saisie */}
      {isPuzzleDone && (
        <>
          <div className="journal">
            {journal.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <p>Entre le chiffre correct :</p>
          <input
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Entre la valeur..."
          />
          <button onClick={verifier}>Valider</button>
          <p className="message">{message}</p>
        </>
      )}
    </div>
  );
}
