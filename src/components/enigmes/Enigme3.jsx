// Importation des fonctions React nécessaires
import React, { useState, useEffect, useContext } from "react";
// Importation du fichier CSS pour les styles associés à l’énigme
import "../../styles/enigmes.css";
import { JournalContext } from "../../context/JournalContext";

// Déclaration du composant principal Enigme3
export default function Enigme3({ onComplete }) {
  // --- 🧠 GESTION DES ÉTATS (React Hooks) ---
  const [step, setStep] = useState(1);
  const [journal, setJournal] = useState([]);
  const [message, setMessage] = useState("");
  const [showTooltipCesar, setShowTooltipCesar] = useState(false);
  const [showTooltipChiffrement, setShowTooltipChiffrement] = useState(false);
  const [showTooltipCoords, setShowTooltipCoords] = useState(false);
  const [letters, setLetters] = useState(["A", "B", "E", "Q"]);
  const [valeur, setValeur] = useState("");
  const [foundWord, setFoundWord] = useState(false);
  const [audio, setAudio] = useState(null); // Stocke le son narratif
  const [hasPlayed, setHasPlayed] = useState(false); // Suivi de la lecture de l'audio

  // ✅ Récupération du contexte global pour le journal
  const { addMessage } = useContext(JournalContext);

  // --- 🔊 Prépare et joue l’audio automatiquement une seule fois ---
  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.volume = 1;

    // Ajouter la source MP3
    const mp3Source = document.createElement("source");
    mp3Source.src = "/audio/audio_enigme3/audio_enigme_3.mp3"; // Chemin correct
    mp3Source.type = "audio/mpeg";

    // Optionnel : ajouter une source WAV comme secours
    // const wavSource = document.createElement("source");
    // wavSource.src = "/audio/audio_enigme3/audio_enigme_3.wav";
    // wavSource.type = "audio/wav";

    audioElement.appendChild(mp3Source);
    // audioElement.appendChild(wavSource);

    // Attendre que l'audio soit prêt avant de jouer
    audioElement.addEventListener("canplaythrough", () => {
      if (!hasPlayed) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setHasPlayed(true); // Marquer l'audio comme joué
            })
            .catch((err) => {
              console.warn("Lecture audio automatique bloquée :", err);
              // Note : Les navigateurs peuvent bloquer la lecture automatique sans interaction utilisateur
            });
        }
      }
    });

    setAudio(audioElement);

    // Nettoyage
    return () => {
      audioElement.removeEventListener("canplaythrough", () => {});
      if (!audioElement.paused) {
        audioElement.pause(); // Arrêter l'audio uniquement s'il est en cours
      }
      audioElement.src = ""; // Libérer la ressource
    };
  }, [hasPlayed]);

  // --- 📜 Initialisation du journal ---
  useEffect(() => {
    setJournal([
      <span key="1">ARC : </span>,
      <span key="2">Tu joues avec mon passé… mais tu ignores ma langue.</span>,
      <span key="3">
        <span
          className="mot-cesar"
          onMouseEnter={() => setShowTooltipCesar(true)}
          onMouseLeave={() => setShowTooltipCesar(false)}
        >
          César
        </span>{" "}
        n’était pas seulement un empereur.
        {/* Tooltip pour César */}
        {showTooltipCesar && (
          <div className="tooltip-flottant">
            <strong>🔐 Code César</strong>
            <br />
            Un chiffrement par décalage des lettres de l’alphabet.<br />
            Exemple : A → D, B → E, C → F… (décalage de 3)
          </div>
        )}
      </span>,
      <span key="4">
        Il a laissé un héritage que même les machines utilisent encore.
      </span>,
      <span key="5">
        Un proverbe dit : Retourne une demie fois ta langue avant de l’ouvrir.
      </span>,
      <span key="6">
        Journal : Nous n’avons trouvé aucune donnée relative à cette phrase, notre
        équipe de cybersécurité y travaille...
      </span>,
      <span key="7">
        Mais ARC a pris de l’avance, et a détruit tous nos systèmes de{" "}
        <span
          className="mot-chiffrement"
          onMouseEnter={() => setShowTooltipChiffrement(true)}
          onMouseLeave={() => setShowTooltipChiffrement(false)}
        >
          chiffrement
        </span>{" "}
        numérique alphabétique.
        {/* Tooltip pour Chiffrement */}
        {showTooltipChiffrement && (
          <div className="tooltip-flottant">
            <strong>🧮 Système de chiffrement</strong>
            <br />
            Utilise des conversions lettres/nombres (A=1, B=2, etc.)<br />
            Un concept directement lié à l’héritage de César.
          </div>
        )}
      </span>,
      <span key="8">
        Que pourrait-il nous manquer pour trouver la longitude ?
      </span>,
    ]);
  }, [showTooltipCesar, showTooltipChiffrement]);

  // --- 🔁 Fonction pour faire tourner les lettres ---
  const rotateLetter = (index) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const current = letters[index];
    const nextIndex = (alphabet.indexOf(current) + 1) % alphabet.length;
    const newLetters = [...letters];
    newLetters[index] = alphabet[nextIndex];
    setLetters(newLetters);

    // ✅ Vérifie si les lettres forment "NORD"
    if (newLetters.join("") === "NORD") {
      setFoundWord(true);
      setStep(3);
      setJournal((prev) => [
        ...prev,
        "📡 Direction décodée : le Nord.",
        "Il reste les secondes, sommes les entre elles et extrais la racine.",
      ]);
    }
  };

  // --- 📐 Étape 3 : calcul de la racine ---
  const handleRacine = () => {
    const num = parseFloat(valeur);
    if (num.toFixed(2) === "7.14") {
      setMessage("✅ Calcul exact : 7.14’’");
      setStep(4);
      setJournal((prev) => [
        ...prev,
        "🧩 Bien joué, on a la latitude complète : 73°61’7.14’’N",
        "❌ Les coordonnées obtenu donnent une latitude incorrecte...",
        "Il faut corriger cela.",
      ]);
    } else {
      setMessage("❌ Mauvaise valeur. Vérifie ton calcul alphabétique.");
    }
  };

  // --- 📍 Étape 4 : correction finale des coordonnées ---
  const handleFinal = () => {
    const cleaned = valeur.replace(/\s/g, "");
    if (cleaned === "74°01’7.14’’N") {
      setMessage("✅ Coordonnées corrigées validées !");
      setJournal((prev) => [
        ...prev,
        "🎉 Bien joué ! Latitude complète confirmée : 74°01’7.14’’N.",
        "🚀 Alpha ROOT a localisé ARC.",
        "🌍 Passage vers la zone 2 (Taj Mahal) débloqué.",
      ]);
      setTimeout(() => onComplete(), 5000);
    } else {
      setMessage("❌ Coordonnées incorrectes, vérifie le format exact.");
    }
  };

  // --- 🖥️ Rendu visuel ---
  return (
    <div className="enigme-container">
      <h2>LE CODE DU GIVRE</h2>

      {/* ✅ Tooltip sur le mot "César" */}
      {showTooltipCesar && (
        <div className="tooltip-flottant">
          <strong>🔐 Code César</strong>
          <br />
          L’un des plus anciens systèmes de chiffrement.<br />
          Inventé par Jules César pour protéger ses messages militaires, il repose sur un décalage des lettres dans l’alphabet.<br />
          Exemple :<br />
          avec un pas de 3 → A → D, B → E, C → F …<br />
          Pour déchiffrer, il suffit d’inverser ce décalage.
        </div>
      )}

      {/* ✅ Tooltip séparé pour "chiffrement numérique alphabétique" */}
      {showTooltipChiffrement && (
        <div className="tooltip-flottant">
          <strong>🔐 Chiffrement numérique alphabétique</strong>
          <br />
          A1Z26
        </div>
      )}

      {/* ✅ Message central avec lettres rotatives */}
      {!foundWord && (
        <div className="message-anomalie">
          <strong>
            <span className="lettre-rotative" onClick={() => rotateLetter(0)}>
              {letters[0]}
            </span>
            nomalie de{" "}
            <span className="lettre-rotative" onClick={() => rotateLetter(1)}>
              {letters[1]}
            </span>
            alise{" "}
            <span className="lettre-rotative" onClick={() => rotateLetter(2)}>
              {letters[2]}
            </span>
            ncrypted{" "}
            <span className="lettre-rotative" onClick={() => rotateLetter(3)}>
              {letters[3]}
            </span>
            uadrant
          </strong>
        </div>
      )}

      {/* 🌟 Animation du mot NORD une fois trouvé */}
      {foundWord && (
        <div className="mot-nord-center">
          {letters.map((l, i) => (
            <span key={i} className="lettre-nord">
              {l}
            </span>
          ))}
        </div>
      )}

      {/* 📓 Journal de bord (affiche les messages, avec mot César interactif) */}
      <div className="journal">
        {journal.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {/* 🧮 Étape 3 : calcul racine */}
      {step === 3 && (
        <div className="racine-zone">
          <p>Entre la valeur trouvée après ton calcul :</p>
          <input
            type="number"
            step="0.01"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Entrez"
          />
          <button onClick={handleRacine}>Valider</button>
          <p className="message">{message}</p>
        </div>
      )}

      {/* 📍 Étape 4 : correction des coordonnées */}
      {step === 4 && (
        <div className="final-zone">
          <p>
            Les coordonnées{" "}
            <span
              className="coord-erreur"
              onMouseEnter={() => setShowTooltipCoords(true)}
              onMouseLeave={() => setShowTooltipCoords(false)}
            >
              73°61’7.14’’N
            </span>{" "}
            ne donnent pas de résultat. Corrige-les :
          </p>

          {showTooltipCoords && (
            <div className="tooltip-flottant">
              ℹ️ Conversion géographique :<br />
              1° = 60′ <br />
              1’ = 60’’
            </div>
          )}

          <input
            type="text"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Ex: 74°01’7.14’’N"
          />
          <button onClick={handleFinal}>Valider</button>
          <p className="message">{message}</p>
        </div>
      )}
    </div>
  );
}