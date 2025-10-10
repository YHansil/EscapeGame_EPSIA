// Importation de React et des hooks nécessaires
import React, { useState, useRef, useContext, useEffect } from "react";
import { JournalContext } from "../../context/JournalContext";

export default function Enigme2({ onComplete }) {
  // --- 🎛️ ÉTATS GÉNÉRAUX ---
  const [videoPlayed, setVideoPlayed] = useState(false); // indique si la vidéo d’intro est terminée
  const [valeur, setValeur] = useState(""); // stocke la valeur saisie
  const [message, setMessage] = useState(""); // message de validation
  const [journal, setJournal] = useState([]); // texte du journal local
  const [audio, setAudio] = useState(null); // Stocke le son narratif

  // ✅ Import du contexte global du Journal
  const { addMessage } = useContext(JournalContext);

  // Référence vers la balise vidéo (pour contrôler lecture/plein écran)
  const videoRef = useRef(null);

  // --- 🔊 Prépare l’audio ---
  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.volume = 1;

    // Ajouter la source MP3
    const mp3Source = document.createElement("source");
    mp3Source.src = "/audio/audio_enigme2/audio_enigme_2.mp3"; // Chemin corrigé
    mp3Source.type = "audio/mpeg";

    // Optionnel : ajouter une source WAV comme secours
    // const wavSource = document.createElement("source");
    // wavSource.src = "/audio/audio_enigme2/audio_enigme_2.wav";
    // wavSource.type = "audio/wav";

    audioElement.appendChild(mp3Source);
    // audioElement.appendChild(wavSource);

    setAudio(audioElement);

    // Nettoyage
    return () => {
      audioElement.pause(); // Arrêter l'audio si le composant est démonté
      audioElement.src = ""; // Libérer la ressource
    };
  }, []);

  // --- LISTE DES PERSONNAGES ---
  const personnages = [
    { nom: "Pierre le Grand", img: "/image/image_enigme2/pierre_le_grand.png", regne: 43 },
    { nom: "Catherine II", img: "/image/image_enigme2/catherine_ii.png", regne: 34 },
    { nom: "Lénine", img: "/image/image_enigme2/lenine.png", regne: 7 },
    { nom: "Staline", img: "/image/image_enigme2/staline.png", regne: 31 },
    { nom: "Gorbatchev", img: "/image/image_enigme2/gorbatchev.png", regne: 6 },
  ];

  // --- 🎬 Lancement de la vidéo en plein écran ---
  const handleStartVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => console.warn("Lecture vidéo bloquée :", err));

      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    }
  };

  // --- 🧩 Quand la vidéo se termine ---
  const handleVideoEnd = () => {
    // Quitte le plein écran si actif
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    // Lecture de l’audio narratif
    if (audio) {
      audio.play().catch((err) => console.warn("Lecture audio bloquée :", err));
    }

    // Met aussi à jour le journal local (affichage dans la page)
    setJournal((prev) => [
      ...prev,
      'ARC : ',
      'Tu crois avoir réparé le Temps ?',
      'Ce que tu as réactivé, c’est l’Histoire...',
      "Journal : Observe les années de règne et effectue le calcul :",
      "Additionne les et divise par le nombre de 2 révolutions.",
    ]);

    setVideoPlayed(true);
  };

  // --- 🧮 Vérifie la réponse du joueur ---
  const verifier = () => {
    const num = parseFloat(valeur);

    if (num === 61) {
      addMessage("📡 Donnée confirmée. Le fichier historique d’ARC est décrypté.");
      addMessage("✅ Deuxième partie de la latitude : 61’ — bien joué !");

      setJournal((prev) => [
        ...prev,
        "📡 Donnée confirmée. Le fichier historique d’ARC est décrypté.",
        "✅ Deuxième partie de la latitude : 61’",
      ]);

      setTimeout(() => onComplete(), 2500);
    } else if (num === 60.5) {
      setJournal((prev) => [...prev, "💡 Indice : cette coordonée ne peut contenir qu'un nombre entier"]);
    } else {
      setMessage("❌ Mauvaise réponse. ARC renforce sa vigilance...");
    }
  };

  // --- 🖼️ AFFICHAGE DU COMPOSANT ---
  return (
    <div className="enigme-container">
      <h2>LA COURBE DES ANDES</h2>

      {/* 🎥 Étape 1 : Lecture de la vidéo plein écran */}
      {!videoPlayed && (
        <div className="video-intro-container">
          <video
            ref={videoRef}
            src="/video/video_histoire.mp4"
            onEnded={handleVideoEnd}
            className="video-fullscreen"
            onClick={handleStartVideo}
          />
          <p className="info-video">
            🎬 Cliquez sur la vidéo pour lancer la séquence d'introduction.
          </p>
        </div>
      )}

      {/* 🎮 Étape 2 : Contenu du jeu après la vidéo */}
      {videoPlayed && (
        <>
          {/* Portraits historiques */}
          <div className="portrait-container">
            {personnages.map((perso, i) => (
              <div key={i} className="portrait-card">
                <img src={perso.img} alt={perso.nom} className="portrait-image" />
                <div className="portrait-hover">
                  <p>{perso.regne} ans</p>
                </div>
                <p className="portrait-nom">{perso.nom}</p>
              </div>
            ))}
          </div>

          {/* Journal local (optionnel) */}
          <div className="journal">
            {journal.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* Zone de réponse */}
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