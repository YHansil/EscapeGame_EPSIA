import React, { useState, useEffect } from "react";
import PuzzleImage from "../PuzzleImage";

export default function Enigme1({ onComplete }) {
  const [isPuzzleDone, setPuzzleDone] = useState(false);
  const [valeur, setValeur] = useState("");
  const [message, setMessage] = useState("");
  const [journal, setJournal] = useState([
    "🧩 ÉNIGME 1 — LE SCEAU DE LA SPASSKAÏA",
    "(Kremlin, Moscou – Première clé de la latitude)",
  ]);

  // ✅ Précharger le son dès le début
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const sound = new Audio("/audio/audio_enigme1/audio_puzzle_resolu.mp3");
    sound.volume = 1;
    setAudio(sound);
  }, []);

  // ✅ Quand le puzzle est résolu
  const handlePuzzleResolved = () => {
    if (!isPuzzleDone) {
      setPuzzleDone(true);

      // Chrome bloque parfois la lecture automatique → on débloque par clic
      const playAudio = () => {
        if (audio) {
          audio.play().catch((err) =>
            console.warn("Lecture audio bloquée :", err)
          );
        }
        window.removeEventListener("click", playAudio);
      };
      window.addEventListener("click", playAudio);

      setJournal((prev) => [
        ...prev,
        '🎧 ARC : "La Tour du Temps détient la Clé du Pouvoir. Ma clé bat selon un cycle que tu ne comprendras jamais."',
        "🗒️ Journal : Convertis-la en minutes et brise-la avec La Clef. Notre agent de liaison a constaté que le cycle dure 10h57.",
      ]);
    }
  };

  // ✅ Vérifie la réponse
  const verifier = () => {
    if (parseInt(valeur) === 73) {
      setMessage("✅ Première partie de la latitude récupérée : 73° !");
      setJournal((prev) => [
        ...prev,
        "📡 Donnée confirmée. Alpha ROOT a débloqué le premier verrou du système ARC.",
      ]);

      // Lecture audio du succès
      if (audio) {
        audio.play().catch((err) =>
          console.warn("Lecture audio bloquée :", err)
        );
      }

      // Attendre un peu avant la transition vers Enigme 2
      setTimeout(() => onComplete(), 3000);
    } else {
      setMessage("❌ Mauvaise réponse, la détection d’ARC augmente de 5%...");
      setJournal((prev) => [
        ...prev,
        "⚠️ Anomalie détectée... chaque erreur attire l’attention d’ARC !",
      ]);
    }
  };

  return (
    <div className="enigme-container">
      <h2>🧩 ÉNIGME 1 — LE SCEAU DE LA SPASSKAÏA</h2>
      <p>
        {isPuzzleDone
          ? "Puzzle complété — observe la Tour Spasskaïa et poursuis ta mission."
          : "Reconstitue le puzzle pour révéler la Tour Spasskaïa."}
      </p>

      {/* ✅ Puzzle interactif (4x4 ou autre selon ton composant) */}
      {!isPuzzleDone && (
        <PuzzleImage
          imageSrc="/image/image_enigme1/image_tour.png"
          onResolve={handlePuzzleResolved}
        />
      )}

      {/* ✅ Une fois le puzzle fini, journal + saisie de la réponse */}
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
