import React, { useState, useRef, useContext, useEffect } from "react";
import { JournalContext } from "../../context/JournalContext";
import { TimerContext } from "../../context/TimerContext";

export default function Enigme2({ onComplete }) {
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [valeur, setValeur] = useState("");
  const [message, setMessage] = useState("");
  const [journal, setJournal] = useState([]);
  const [audio, setAudio] = useState(null);
  const videoRef = useRef(null);
  const { addMessage } = useContext(JournalContext);
  const timerContext = useContext(TimerContext);
  const { timeLeft, isGameOver, applyPenalty, formatTime } = timerContext || {
    timeLeft: 20 * 60,
    isGameOver: false,
    applyPenalty: () => {},
    formatTime: () => "20:00",
  };

  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.volume = 1;

    const mp3Source = document.createElement("source");
    mp3Source.src = "/audio/audio_enigme2/audio_enigme_2.mp3";
    mp3Source.type = "audio/mpeg";

    audioElement.appendChild(mp3Source);
    setAudio(audioElement);

    return () => {
      if (!audioElement.paused) {
        audioElement.pause();
      }
      audioElement.src = "";
    };
  }, []);

  const personnages = [
    { nom: "Pierre le Grand", img: "/image/image_enigme2/pierre_le_grand.png", regne: 43 },
    { nom: "Catherine II", img: "/image/image_enigme2/catherine_ii.png", regne: 34 },
    { nom: "Lénine", img: "/image/image_enigme2/lenine.png", regne: 7 },
    { nom: "Staline", img: "/image/image_enigme2/staline.png", regne: 31 },
    { nom: "Gorbatchev", img: "/image/image_enigme2/gorbatchev.png", regne: 6 },
  ];

  const handleStartVideo = () => {
    if (isGameOver) return;

    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => console.warn("Lecture vidéo bloquée :", err));
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    }
  };

  const handleVideoEnd = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    if (audio && !isGameOver) {
      audio.play().catch((err) => console.warn("Lecture audio bloquée :", err));
    }

    setJournal((prev) => [
      ...prev,
      "ARC : ",
      "Tu crois avoir réparé le Temps ?",
      "Ce que tu as réactivé, c’est l’Histoire...",
      "Journal : Observe les années de règne et effectue le calcul :",
      "Additionne les et divise par le nombre de 2 révolutions.",
    ]);

    setVideoPlayed(true);
  };

  const verifier = () => {
    if (isGameOver) return;

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
      setJournal((prev) => [
        ...prev,
        "💡 Indice : cette coordonée ne peut contenir qu'un nombre entier",
      ]);
      applyPenalty();
    } else {
      setMessage("❌ Mauvaise réponse. ARC renforce sa vigilance...");
      applyPenalty();
    }
  };

  return (
    <div className="enigme-container">
      <h2>LA COURBE DES ANDES</h2>
      <div className="timer-container">
        {isGameOver ? (
          <p className="timer-gameover">Temps écoulé ! La mission a échoué.</p>
        ) : (
          <p className="timer">Temps restant : {formatTime()}</p>
        )}
      </div>

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

      {videoPlayed && (
        <>
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

          <div className="journal">
            {journal.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="reponse-zone">
            <p>Entre le résultat de ton calcul :</p>
            <input
              type="number"
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              placeholder="Entre la valeur..."
              disabled={isGameOver}
            />
            <button onClick={verifier} disabled={isGameOver}>Valider</button>
            <p className="message">{message}</p>
          </div>
        </>
      )}
    </div>
  );
}