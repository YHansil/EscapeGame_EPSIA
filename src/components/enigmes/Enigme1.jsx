import React, { useState, useEffect, useContext } from "react";
import { JournalContext } from "../../context/JournalContext";
import { TimerContext } from "../../context/TimerContext";
import PuzzleImage from "../PuzzleImage";

export default function Enigme1({ onComplete }) {
  const { addMessage } = useContext(JournalContext);
  const timerContext = useContext(TimerContext);
  const { timeLeft, isGameOver, applyPenalty, formatTime } = timerContext || {
    timeLeft: 20 * 60,
    isGameOver: false,
    applyPenalty: () => {},
    formatTime: () => "20:00",
  };

  const [isPuzzleDone, setPuzzleDone] = useState(false);
  const [valeur, setValeur] = useState("");
  const [message, setMessage] = useState("");
  const [journal, setJournal] = useState([]);
  const [audio, setAudio] = useState(null);

  // Prépare l'audio au montage du composant
  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.volume = 1;

    const mp3Source = document.createElement("source");
    mp3Source.src = "/audio/audio_enigme1/audio_puzzle_resolu.mp3";
    mp3Source.type = "audio/mpeg";

    audioElement.appendChild(mp3Source);
    setAudio(audioElement);

    return () => {
      if (audioElement && !audioElement.paused) {
        audioElement.pause();
      }
      audioElement.src = "";
    };
  }, []);

  // Quand le puzzle est résolu, joue l'audio et met à jour le journal
  const handlePuzzleResolved = () => {
    if (!isPuzzleDone && !isGameOver) {
      setPuzzleDone(true);
      setJournal((prev) => [
        ...prev,
        "ARC : ",
        "La Tour du Temps détient la Clé du Pouvoir. Ma clé bat selon un cycle que tu ne comprendras jamais.",
        "Journal : Convertis-la en minutes et brise-la avec La Clef. Notre agent de liaison a constaté que le cycle dure 10h57.",
      ]);
      // Joue l'audio après la résolution du puzzle
      if (audio) {
        audio.play().catch((err) => console.warn("Lecture audio bloquée :", err));
      }
    }
  };

  // Vérifie la réponse du joueur
  const verifier = () => {
    if (isGameOver) return;

    if (parseInt(valeur) === 73) {
      addMessage("📡 Donnée confirmée. Alpha ROOT a débloqué le premier verrou du système ARC.");
      addMessage("✅ Première partie de la latitude récupérée : 73° !");
      setTimeout(() => onComplete(), 3000);
    } else {
      setMessage([
        "❌ Mauvaise réponse, la détection d’ARC augmente de 5%...",
        <br />,
        "⚠️ Anomalie détectée... chaque erreur attire l’attention d’ARC !",
      ]);
      applyPenalty();
    }
  };

  return (
    <div className="enigme-container">
      <h2>LE SCEAU DE LA SPASSKAÏA</h2>
      <div className="timer-container">
        {isGameOver ? (
          <p className="timer-gameover">Temps écoulé ! La mission a échoué.</p>
        ) : (
          <p className="timer">Temps restant : {formatTime()}</p>
        )}
      </div>

      <p>
        {isPuzzleDone
          ? "Puzzle complété — observe la Tour Spasskaïa et poursuis ta mission."
          : "Reconstitue le puzzle pour révéler la Tour Spasskaïa."}
      </p>

      {!isPuzzleDone && (
        <PuzzleImage
          imageSrc="/image/image_enigme1/image_tour.png"
          onResolve={handlePuzzleResolved}
        />
      )}

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
            disabled={isGameOver}
          />
          <button onClick={verifier} disabled={isGameOver}>Valider</button>
          <p className="message">{message}</p>
        </>
      )}
    </div>
  );
}