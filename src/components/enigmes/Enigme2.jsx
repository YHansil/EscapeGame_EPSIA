// Importation des fonctions nécessaires depuis React
import React, { useState, useRef } from "react";

// Définition du composant principal de l’énigme 2
export default function Enigme2({ onComplete }) {
  // --- 🎛️ États (useState) ---

  // `isStarted` indique si le joueur a lancé la mission
  const [isStarted, setIsStarted] = useState(false);

  // `valeur` stocke la réponse numérique saisie par le joueur
  const [valeur, setValeur] = useState("");

  // `message` contient le message de résultat (succès / erreur / indice)
  const [message, setMessage] = useState("");

  // `journal` contient le texte narratif affiché sur le "journal de bord"
  const [journal, setJournal] = useState([
    "🧩 ÉNIGME 2 — LA COURBE DES ANDES",
    "“L'Histoire se remet en marche...”",
  ]);

  // Référence vers la vidéo (pour la contrôler depuis le code)
  const videoRef = useRef(null);

  // Liste des personnages affichés à l’écran avec leurs images et durées de règne
  const personnages = [
    { nom: "Pierre le Grand", img: "/image/image_enigme2/pierre_le_grand.png", regne: 43 },
    { nom: "Catherine II", img: "/image/image_enigme2/catherine_ii.png", regne: 34 },
    { nom: "Lénine", img: "/image/image_enigme2/lenine.png", regne: 7 },
    { nom: "Staline", img: "/image/image_enigme2/staline.png", regne: 31 },
    { nom: "Gorbatchev", img: "/image/image_enigme2/gorbatchev.png", regne: 6 },
  ];

  // --- 🎬 Fonction déclenchée par le clic "Commencer la mission" ---
  const handleStart = () => {
    // Active le mode "énigme lancée"
    setIsStarted(true);

    // Lecture de la vidéo depuis sa référence
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.warn("Lecture vidéo bloquée :", err));
    }

    // Lecture de l’audio de narration
    const audio = new Audio("/audio/audio_enigme2/audio1.mp3");
    audio.play().catch((err) => console.warn("Lecture audio bloquée :", err));

    // Ajout de texte narratif dans le journal de bord
    setJournal((prev) => [
      ...prev,
      '🎧 Voix : "Tu crois avoir réparé le Temps ? Ce que tu as réactivé, c’est l’Histoire..."',
      "📺 La Tour Spasskaïa s'anime. Les visages des dirigeants défilent à toute vitesse.",
      "🗒️ Journal : Observe les années de règne et effectue le calcul :",
      "Additionne leurs règnes et divise par le nombre de 2 révolutions.",
    ]);
  };

  // --- 🧮 Fonction de vérification de la réponse ---
  const verifier = () => {
    const num = parseFloat(valeur); // convertit la valeur saisie en nombre

    if (num === 61) {
      // ✅ Bonne réponse
      setMessage("✅ Deuxième partie de la latitude : 61’ — bien joué !");
      setJournal((prev) => [
        ...prev,
        "📡 Donnée confirmée. Le fichier historique d’ARC est débloqué.",
      ]);

      // Passe à l’énigme suivante après 2,5 secondes
      setTimeout(() => onComplete(), 2500);
    } else if (num === 60.5) {
      // 💡 Réponse presque correcte
      setMessage("💡 Indice : arrondis le résultat.");
      setJournal((prev) => [
        ...prev,
        "🔍 Conseil : les coordonnées nécessitent une valeur entière.",
      ]);
    } else {
      // ❌ Mauvaise réponse
      setMessage("❌ Mauvaise réponse. ARC renforce sa vigilance...");
      setJournal((prev) => [
        ...prev,
        "⚠️ Donnée incohérente. Vérifie ton calcul.",
      ]);
    }
  };

  // --- 🎨 Rendu de l’interface ---
  return (
    <div className="enigme-container">
      {/* Titre principal */}
      <h2>🧩 ÉNIGME 2 — LA COURBE DES ANDES</h2>

      {/* --- Étape 1 : Bouton de lancement --- */}
      {!isStarted && (
        <div className="start-section">
          <p>Une anomalie temporelle a été détectée...</p>
          <button onClick={handleStart}>▶ Commencer la mission</button>
        </div>
      )}

      {/* --- Étape 2 : Vidéo + contenu interactif --- */}
      {isStarted && (
        <>
          {/* 🎥 Vidéo historique (muette au départ, contrôlable par le joueur) */}
          <div className="video-section">
            <video
              ref={videoRef}
              src="/video/video_histoire.mp4"
              width="500"
              controls
            ></video>
          </div>

          {/* 🖼️ Portraits des dirigeants historiques */}
          <div className="portrait-container">
            {personnages.map((perso, i) => (
              <div key={i} className="portrait-card">
                <img
                  src={perso.img}
                  alt={perso.nom}
                  className="portrait-image"
                />
                {/* Apparition du nombre d’années au survol */}
                <div className="portrait-hover">
                  <p>{perso.regne} ans</p>
                </div>
                <p className="portrait-nom">{perso.nom}</p>
              </div>
            ))}
          </div>

          {/* 📜 Journal de bord dynamique */}
          <div className="journal">
            {journal.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* 🧮 Zone de réponse */}
          <div className="reponse-zone">
            <p>Entre le résultat de ton calcul :</p>
            <input
              type="number"
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              placeholder="Entre la valeur..."
            />
            <button onClick={verifier}>Valider</button>
            <p className="message">{message}</p>
          </div>
        </>
      )}
    </div>
  );
}
