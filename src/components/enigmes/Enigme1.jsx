import React, { useState, useEffect, useContext } from "react"; // Importation de React, des hooks et du contexte
import { JournalContext } from "../../context/JournalContext"; // Import du contexte global du Journal
import PuzzleImage from "../PuzzleImage"; // Import du composant enfant PuzzleImage (le puzzle à reconstituer)

export default function Enigme1({ onComplete }) {
  // --- CONTEXTE GLOBAL ---
  const { addMessage } = useContext(JournalContext); // Permet d’ajouter un message dans le Journal global

  // --- ÉTATS (useState) ---
  const [isPuzzleDone, setPuzzleDone] = useState(false); // Indique si le puzzle est terminé
  const [valeur, setValeur] = useState(""); // Stocke la valeur saisie
  const [message, setMessage] = useState(""); // Message de validation
  const [journal, setJournal] = useState([]); // Journal local de l’énigme

  const [audio, setAudio] = useState(null); // Stocke le son du succès

  // --- 🔊 Prépare l’audio ---
  useEffect(() => {
    const sound = new Audio("/audio/audio_enigme1/audio_puzzle_resolu.mp3");
    sound.volume = 1;
    setAudio(sound);
  }, []);

  // --- 🧩 Quand le puzzle est résolu ---
  const handlePuzzleResolved = () => {
    if (!isPuzzleDone) {
      setPuzzleDone(true);

      // Lecture audio à la première interaction
      const playAudio = () => {
        if (audio) {
          audio.play().catch((err) =>
            console.warn("Lecture audio bloquée :", err)
          );
        }
        window.removeEventListener("click", playAudio);
      };
      window.addEventListener("click", playAudio);


      // Ajoute aussi dans le journal local
      setJournal((prev) => [
        ...prev,
        'ARC : ',
        "La Tour du Temps détient la Clé du Pouvoir. Ma clé bat selon un cycle que tu ne comprendras jamais.",
        "Journal : Convertis-la en minutes et brise-la avec La Clef. Notre agent de liaison a constaté que le cycle dure 10h57.",
      ]);
    }
  };

  // --- 🧮 Vérifie la réponse du joueur ---
  const verifier = () => {
    if (parseInt(valeur) === 73) {
      addMessage("📡 Donnée confirmée. Alpha ROOT a débloqué le premier verrou du système ARC.");
      addMessage("✅ Première partie de la latitude récupérée : 73° !");
      //setMessage("✅ Première partie de la latitude récupérée : 73° !");
      //setJournal((prev) => [
      //  ...prev,
      //  "📡 Donnée confirmée. Alpha ROOT a débloqué le premier verrou du système ARC.",
      //]);

      // Lecture du son de réussite
      if (audio) {
        audio.play().catch((err) =>
          console.warn("Lecture audio bloquée :", err)
        );
      }

      // Transition vers l’énigme suivante
      setTimeout(() => onComplete(), 3000);
    } else {
      setMessage([
        "❌ Mauvaise réponse, la détection d’ARC augmente de 5%...",
        <br />,
        "⚠️ Anomalie détectée... chaque erreur attire l’attention d’ARC !",
    ]);
    }
  };

  // --- 🎨 AFFICHAGE ---
  return (
    <div className="enigme-container">
      {/* Titre principal */}
      <h2>LE SCEAU DE LA SPASSKAÏA</h2>

      {/* Message introductif */}
      <p>
        {isPuzzleDone
          ? "Puzzle complété — observe la Tour Spasskaïa et poursuis ta mission."
          : "Reconstitue le puzzle pour révéler la Tour Spasskaïa."}
      </p>

      {/* Puzzle affiché tant qu’il n’est pas fini */}
      {!isPuzzleDone && (
        <PuzzleImage
          imageSrc="/image/image_enigme1/image_tour.png"
          onResolve={handlePuzzleResolved}
        />
      )}

      {/* Interface une fois le puzzle fini */}
      {isPuzzleDone && (
        <>
          {/* Journal local de l’énigme */}
          <div className="journal">
            {journal.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* Champ de saisie */}
          <p>Entre le chiffre correct :</p>
          <input
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Entre la valeur..."
          />

          {/* Bouton de validation */}
          <button onClick={verifier}>Valider</button>

          {/* Message d’état */}
          <p className="message">{message}</p>
        </>
      )}
    </div>
  );
}
