// src/components/enigmes/Enigme2.jsx
import React, { useState, useEffect } from "react";

export default function Enigme2({ onComplete }) {
  const [isStarted, setIsStarted] = useState(false);
  const [valeur, setValeur] = useState("");
  const [message, setMessage] = useState("");
  const [journal, setJournal] = useState([
    "🧩 ÉNIGME 2 — LA COURBE DES ANDES",
    "“L'Histoire se remet en marche...”",
  ]);

  const personnages = [
    { nom: "Pierre le Grand", img: "/image/image_enigme2/pierre_le_grand.png", regne: 43 },
    { nom: "Catherine II", img: "/image/image_enigme2/catherine_ii.png", regne: 34 },
    { nom: "Lénine", img: "/image/image_enigme2/lenine.png", regne: 7 },
    { nom: "Staline", img: "/image/image_enigme2/staline.png", regne: 31 },
    { nom: "Gorbatchev", img: "/image/image_enigme2/gorbatchev.png", regne: 6 },
  ];

  useEffect(() => {
    // Lecture audio + vidéo dès le lancement de l’énigme
    const audio = new Audio("/audio/audio_enigme2/audio1.mp3");
    audio.play();
    setIsStarted(true);

    setJournal((prev) => [
      ...prev,
      '🎧 Voix : "Tu crois avoir réparé le Temps ? Ce que tu as réactivé, c’est l’Histoire..."',
      "📺 La Tour Spasskaïa s'anime. Les visages des dirigeants défilent à toute vitesse.",
      "🗒️ Journal : Observe les années de règne et effectue le calcul :",
      "Additionne leurs règnes et divise par le nombre de 2 révolutions.",
    ]);
  }, []);

  const verifier = () => {
    const num = parseFloat(valeur);
    if (num === 61) {
      setMessage("✅ Deuxième partie de la latitude : 61’ — bien joué !");
      setJournal((prev) => [
        ...prev,
        "📡 Donnée confirmée. Le fichier historique d’ARC est débloqué.",
      ]);
      setTimeout(() => onComplete(), 2500);
    } else if (num === 60.5) {
      setMessage("💡 Indice : arrondis le résultat.");
      setJournal((prev) => [
        ...prev,
        "🔍 Conseil : les coordonnées nécessitent une valeur entière.",
      ]);
    } else {
      setMessage("❌ Mauvaise réponse. ARC renforce sa vigilance...");
      setJournal((prev) => [
        ...prev,
        "⚠️ Donnée incohérente. Vérifie ton calcul.",
      ]);
    }
  };

  return (
    <div className="enigme-container">
      <h2>🧩 ÉNIGME 2 — LA COURBE DES ANDES</h2>

      {/* Section vidéo introductive */}
      {isStarted && (
        <div className="video-section">
          <video
            src="/video/video_histoire.mp4"
            controls
            autoPlay
            width="500"
          ></video>
        </div>
      )}

      {/* Images des dirigeants historiques */}
      <div className="portrait-container">
        {personnages.map((perso, i) => (
          <div key={i} className="portrait-card">
            <img
              src={perso.img}
              alt={perso.nom}
              className="portrait-image"
            />
            <div className="portrait-hover">
              <p>{perso.regne} ans</p>
            </div>
            <p className="portrait-nom">{perso.nom}</p>
          </div>
        ))}
      </div>

      {/* Journal de bord */}
      <div className="journal">
        {journal.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {/* Champ de réponse */}
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
    </div>
  );
}
