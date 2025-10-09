import React, { useEffect, useRef } from "react";
import "../styles/ui.css"; // assure-toi que ce fichier existe pour le style

export default function MenuPrincipal({ onJouer }) {
  const videoRef = useRef(null);

  // Assure que la vidéo se joue automatiquement en boucle (sans son bloqué par Chrome)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) =>
        console.warn("Lecture vidéo bloquée :", err)
      );
    }
  }, []);

  return (
    <div className="menu-principal">
      {/* 🎥 Vidéo d’arrière-plan */}
      <video
        ref={videoRef}
        className="video-fond"
        src="/video/video_intro.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Superposition sombre pour lisibilité du texte */}
      <div className="overlay"></div>

      {/* 🔹 Contenu du menu principal */}
      <div className="menu-contenu">
        <h1 className="titre-jeu">EPSIA</h1>
        <h2 className="sous-titre">Éradication Planifiée par Système d’IA</h2>

        <div className="menu-boutons">
          <button className="btn-jouer" onClick={onJouer}>
            ▶ Jouer
          </button>
          <button className="btn-options">⚙ Options</button>
        </div>
      </div>
    </div>
  );
}
