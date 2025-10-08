// src/components/enigmes/Enigme3.jsx
import React, { useState, useEffect } from "react";
import "../../styles/enigmes.css";

export default function Enigme3({ onComplete }) {
  // --- États principaux ---
  const [step, setStep] = useState(1);
  const [journal, setJournal] = useState([]);
  const [message, setMessage] = useState("");
  const [showTooltipCesar, setShowTooltipCesar] = useState(false);
  const [showTooltipCoords, setShowTooltipCoords] = useState(false);
  const [letters, setLetters] = useState(["A", "B", "E", "Q"]); // lettres interactives
  const [valeur, setValeur] = useState("");

  // --- Étape 1 : Lecture de l’audio + sous-titres ---
  useEffect(() => {
    const audio = new Audio("/audio/audio_enigme3/audio_enigme3.mp3");
    audio.play();

    setJournal([
      "🎧 Audio détecté : Décryptage du flux ARC...",
      "🗒️ Sous-titres :",
      "“Tu joues avec mon passé… mais tu ignores ma langue.”",
      "“César n’était pas seulement un empereur.”",
      "“Il a laissé un héritage que même les machines utilisent encore.”",
      "ℹ️ Le mot *César* semble caché une indication.",
    ]);
  }, []);

  // --- Fonction pour tourner une lettre (mollette A-Z) ---
  const rotateLetter = (index) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const current = letters[index];
    const nextIndex = (alphabet.indexOf(current) + 1) % alphabet.length;
    const newLetters = [...letters];
    newLetters[index] = alphabet[nextIndex];
    setLetters(newLetters);

    // Si le mot NORD est formé
    if (newLetters.join("") === "NORD") {
      setMessage("✅ Mot trouvé : NORD");
      setStep(3);
      setJournal((prev) => [
        ...prev,
        "📡 Direction décodée : le Nord.",
        "🧮 Il reste les secondes. Somme les entre elles et extrais la racine.",
      ]);
    }
  };

  // --- Étape 3 : Calcul racine ---
  const handleRacine = () => {
    const num = parseFloat(valeur);
    if (num.toFixed(2) === "7.14") {
      setMessage("✅ Calcul exact : 7.14’’");
      setStep(4);
      setJournal((prev) => [
        ...prev,
        "🧩 Bien joué, on a la latitude complète : 73°61’7.14’’N",
        "❌ Les coordonnées 73°61’7.14’’N ne donnent pas de résultat...",
        "ℹ️ Un indice pourrait se cacher en passant la souris sur les coordonnées...",
      ]);
    } else {
      setMessage("❌ Mauvaise valeur. Vérifie ton calcul alphabétique.");
      setJournal((prev) => [
        ...prev,
        "🧮 Indice : N=14, O=15, R=18, D=4 → somme=51 → √51 ≈ 7.14",
      ]);
    }
  };

  // --- Étape 4 : Validation finale des coordonnées ---
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

  return (
    <div className="enigme-container">
      <h2>🧩 ÉNIGME 3 — LE CODE DU GIVRE</h2>

      {/* Sous-titres + Tooltip César */}
      {step === 1 && (
        <div className="subtitle">
          <p>
            “Tu joues avec mon passé… mais tu ignores ma langue.” <br />
            “
            <span
              className="mot-cesar"
              onMouseEnter={() => setShowTooltipCesar(true)}
              onMouseLeave={() => setShowTooltipCesar(false)}
            >
              César
            </span>{" "}
            n’était pas seulement un empereur.” <br />
            “Il a laissé un héritage que même les machines utilisent encore.”
          </p>

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
        </div>
      )}

      {/* Message central : Anomalie */}
      {step >= 1 && (
        <div className="message-anomalie">
          <strong>
            <span className="lettre-rotative" onClick={() => rotateLetter(0)}>
              A
            </span>
            nomalie de{" "}
            <span className="lettre-rotative" onClick={() => rotateLetter(1)}>
              B
            </span>
            alise{" "}
            <span className="lettre-rotative" onClick={() => rotateLetter(2)}>
              E
            </span>
            ncrypted{" "}
            <span className="lettre-rotative" onClick={() => rotateLetter(3)}>
              Q
            </span>
            uadrant
          </strong>
        </div>
      )}

      {/* Journal de bord */}
      <div className="journal">
        {journal.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {/* Étape 3 : Calcul racine */}
      {step === 3 && (
        <div className="racine-zone">
          <p>Entre la valeur trouvée après ton calcul :</p>
          <input
            type="number"
            step="0.01"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Ex: 7.14"
          />
          <button onClick={handleRacine}>Valider</button>
          <p className="message">{message}</p>
        </div>
      )}

      {/* Étape 4 : Correction des coordonnées */}
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
