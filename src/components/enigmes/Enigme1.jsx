import React, { useState, useEffect } from "react"; // Importation des fonctions et hooks nécessaires de React

import PuzzleImage from "../PuzzleImage"; // Import du composant enfant PuzzleImage (le puzzle à reconstituer)


export default function Enigme1({ onComplete }) {

  // --- ÉTATS (useState) ---

  // Indique si le puzzle est terminé ou non (false au départ)
  const [isPuzzleDone, setPuzzleDone] = useState(false);

  // Stocke la valeur saisie par le joueur pour la réponse finale (le chiffre)
  const [valeur, setValeur] = useState("");

  // Message de retour pour le joueur (succès / erreur)
  const [message, setMessage] = useState("");

  // Journal de bord (liste de messages narratifs affichés à l’écran)
  const [journal, setJournal] = useState([
    "🧩 ÉNIGME 1 — LE SCEAU DE LA SPASSKAÏA",
    "(Kremlin, Moscou – Première clé de la latitude)",
  ]);

  // Prépare une variable d’état pour stocker un objet audio (pour le son de succès)
  const [audio, setAudio] = useState(null);

  // --- EFFET SECONDAIRE : useEffect ---
  // S’exécute une fois au montage du composant
  useEffect(() => {
    // Crée un nouvel objet audio en mémoire à partir du fichier présent dans /public
    const sound = new Audio("/audio/audio_enigme1/audio_puzzle_resolu.mp3");
    // Définit le volume à 100%
    sound.volume = 1;
    // Stocke cet objet audio dans l’état local `audio`
    setAudio(sound);
  }, []); // [] = exécuter une seule fois à l’initialisation

  // --- FONCTION : quand le puzzle est résolu ---
  const handlePuzzleResolved = () => {
    // Vérifie que le puzzle n’a pas déjà été marqué comme terminé
    if (!isPuzzleDone) {
      // Met à jour l’état pour indiquer que le puzzle est fini
      setPuzzleDone(true);

      // Comme Chrome bloque parfois l’audio automatique, on prépare un “déblocage”
      // L’audio sera lu dès que l’utilisateur clique sur la page
      const playAudio = () => {
        if (audio) {
          audio.play().catch((err) =>
            console.warn("Lecture audio bloquée :", err)
          );
        }
        // Une fois l’audio joué, on retire le listener pour éviter les répétitions
        window.removeEventListener("click", playAudio);
      };
      // On écoute le premier clic utilisateur pour déclencher le son
      window.addEventListener("click", playAudio);

      // Ajoute de nouvelles lignes dans le journal de bord (messages narratifs)
      setJournal((prev) => [
        ...prev,
        '🎧 ARC : "La Tour du Temps détient la Clé du Pouvoir. Ma clé bat selon un cycle que tu ne comprendras jamais."',
        "🗒️ Journal : Convertis-la en minutes et brise-la avec La Clef. Notre agent de liaison a constaté que le cycle dure 10h57.",
      ]);
    }
  };

  // --- FONCTION : vérifie la réponse saisie par le joueur ---
  const verifier = () => {
    // Convertit la valeur saisie en nombre entier et vérifie si elle est correcte (73)
    if (parseInt(valeur) === 73) {
      // Affiche un message de succès
      setMessage("✅ Première partie de la latitude récupérée : 73° !");
      // Ajoute des entrées dans le journal de bord
      setJournal((prev) => [
        ...prev,
        "📡 Donnée confirmée. Alpha ROOT a débloqué le premier verrou du système ARC.",
      ]);

      // Lecture du son de réussite si disponible
      if (audio) {
        audio.play().catch((err) =>
          console.warn("Lecture audio bloquée :", err)
        );
      }

      // Après un court délai (3 secondes), on passe automatiquement à l’énigme suivante
      setTimeout(() => onComplete(), 1000);
    } else {
      // Si la valeur est incorrecte, affiche un message d’erreur
      setMessage("❌ Mauvaise réponse, la détection d’ARC augmente de 5%...");
      // Ajoute un avertissement dans le journal
      setJournal((prev) => [
        ...prev,
        "⚠️ Anomalie détectée... chaque erreur attire l’attention d’ARC !",
      ]);
    }
  };

  // --- RENDU JSX (affichage à l’écran) ---
  return (
    <div className="enigme-container">
      {/* Titre principal de l’énigme */}
      <h2>🧩 ÉNIGME 1 — LE SCEAU DE LA SPASSKAÏA</h2>

      {/* Texte d’introduction, change selon que le puzzle est fini ou non */}
      <p>
        {isPuzzleDone
          ? "Puzzle complété — observe la Tour Spasskaïa et poursuis ta mission."
          : "Reconstitue le puzzle pour révéler la Tour Spasskaïa."}
      </p>

      {/* ✅ Affiche le puzzle uniquement tant qu’il n’est pas terminé */}
      {!isPuzzleDone && (
        <PuzzleImage
          imageSrc="/image/image_enigme1/image_tour.png" // chemin vers l’image
          onResolve={handlePuzzleResolved} // fonction à appeler quand le puzzle est fini
        />
      )}

      {/* ✅ Si le puzzle est terminé, on affiche le reste de l’interface */}
      {isPuzzleDone && (
        <>
          {/* Journal de bord : affichage dynamique de chaque ligne */}
          <div className="journal">
            {journal.map((line, index) => (
              <p key={index}>{line}</p> // chaque entrée du journal est affichée séparément
            ))}
          </div>

          {/* Champ de saisie de la réponse */}
          <p>Entre le chiffre correct :</p>
          <input
            type="number" // champ numérique
            value={valeur} // lié à la variable d’état
            onChange={(e) => setValeur(e.target.value)} // met à jour la valeur à chaque frappe
            placeholder="Entre la valeur..." // texte d’aide
          />

          {/* Bouton pour valider la réponse */}
          <button onClick={verifier}>Valider</button>

          {/* Message de résultat (succès ou erreur) */}
          <p className="message">{message}</p>
        </>
      )}
    </div>
  );
}
