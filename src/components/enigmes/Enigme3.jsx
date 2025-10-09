// Importation des fonctions React nécessaires
import React, { useState, useEffect } from "react";
// Importation du fichier CSS pour les styles associés à l’énigme
import "../../styles/enigmes.css";

// Déclaration du composant principal Enigme3
export default function Enigme3({ onComplete }) {
  // --- 🧠 GESTION DES ÉTATS (React Hooks) ---
  const [step, setStep] = useState(1); // contrôle la progression de l’énigme
  const [journal, setJournal] = useState([]); // stocke les messages du journal
  const [message, setMessage] = useState(""); // message affiché au joueur
  const [showTooltipCesar, setShowTooltipCesar] = useState(false); // affiche le tooltip d’infos sur César
  const [showTooltipCoords, setShowTooltipCoords] = useState(false); // affiche l’indice sur les coordonnées
  const [letters, setLetters] = useState(["A", "B", "E", "Q"]); // lettres rotatives
  const [valeur, setValeur] = useState(""); // valeur numérique ou texte saisie par le joueur
  const [foundWord, setFoundWord] = useState(false); // ✅ devient true quand le mot NORD est trouvé

  // --- 🔊 Étape 1 : lecture audio et affichage des sous-titres ---
  useEffect(() => {
    // Création d’un objet audio
    const audio = new Audio("/audio/audio_enigme3/audio_enigme3.mp3");
    // Tentative de lecture du fichier audio
    audio.play().catch((e) => console.warn("Audio bloqué :", e));

    // Initialisation du journal de bord avec les sous-titres
    setJournal([
      "🎧 Audio détecté : Décryptage du flux ARC...",
      "🗒️ Sous-titres :",
      "“Tu joues avec mon passé… mais tu ignores ma langue.”",
      "“César n’était pas seulement un empereur.”",
      "“Il a laissé un héritage que même les machines utilisent encore.”",
      "ℹ️ Le mot *César* semble cacher une indication.",
    ]);
  }, []);

  // --- 🔁 Fonction pour faire tourner les lettres ---
  const rotateLetter = (index) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // alphabet sous forme de tableau
    const current = letters[index]; // lettre actuelle
    const nextIndex = (alphabet.indexOf(current) + 1) % alphabet.length; // calcule la suivante
    const newLetters = [...letters]; // copie du tableau actuel
    newLetters[index] = alphabet[nextIndex]; // remplace la lettre par la suivante
    setLetters(newLetters); // met à jour l’état

    // ✅ Vérifie si les lettres forment le mot "NORD"
    if (newLetters.join("") === "NORD") {
      setFoundWord(true); // déclenche l’animation centrale
      setMessage("✅ Mot trouvé : NORD"); // message utilisateur
      setStep(3); // passe à l’étape 3 (calcul racine)
      setJournal((prev) => [
        ...prev,
        "📡 Direction décodée : le Nord.",
        "🧮 Il reste les secondes. Somme les entre elles et extrais la racine.",
      ]);
    }
  };

  // --- 📐 Étape 3 : calcul de la racine ---
  const handleRacine = () => {
    const num = parseFloat(valeur); // convertit en nombre
    if (num.toFixed(2) === "7.14") {
      // ✅ bonne réponse
      setMessage("✅ Calcul exact : 7.14’’");
      setStep(4); // passe à l’étape suivante
      setJournal((prev) => [
        ...prev,
        "🧩 Bien joué, on a la latitude complète : 73°61’7.14’’N",
        "❌ Les coordonnées 73°61’7.14’’N ne donnent pas de résultat...",
        "ℹ️ Un indice pourrait se cacher en passant la souris sur les coordonnées...",
      ]);
    } else {
      // ❌ mauvaise réponse
      setMessage("❌ Mauvaise valeur. Vérifie ton calcul alphabétique.");
      setJournal((prev) => [
        ...prev,
        "🧮 Indice : N=14, O=15, R=18, D=4 → somme=51 → √51 ≈ 7.14",
      ]);
    }
  };

  // --- 📍 Étape 4 : correction finale des coordonnées ---
  const handleFinal = () => {
    const cleaned = valeur.replace(/\s/g, ""); // nettoie la valeur
    if (cleaned === "74°01’7.14’’N") {
      // ✅ bonne réponse finale
      setMessage("✅ Coordonnées corrigées validées !");
      setJournal((prev) => [
        ...prev,
        "🎉 Bien joué ! Latitude complète confirmée : 74°01’7.14’’N.",
        "🚀 Alpha ROOT a localisé ARC.",
        "🌍 Passage vers la zone 2 (Taj Mahal) débloqué.",
      ]);
      // Attente avant la transition
      setTimeout(() => onComplete(), 5000);
    } else {
      setMessage("❌ Coordonnées incorrectes, vérifie le format exact.");
    }
  };

  // --- 🖥️ Rendu visuel ---
  return (
    <div className="enigme-container">
      {/* Titre principal */}
      <h2>🧩 ÉNIGME 3 — LE CODE DU GIVRE</h2>

      {/* Sous-titres + info sur le mot César */}
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

          {/* Tooltip flottant qui explique le code César */}
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

      {/* ✅ Affichage du message avec lettres rotatives (disparaît une fois NORD trouvé) */}
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

      {/* 🌟 Une fois NORD trouvé → animation centrale */}
      {foundWord && (
        <div className="mot-nord-center">
          {letters.map((l, i) => (
            <span key={i} className="lettre-nord">
              {l}
            </span>
          ))}
        </div>
      )}

      {/* 📓 Journal de bord dynamique */}
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
            placeholder="Ex: 7.14"
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

          {/* Tooltip des indices géographiques */}
          {showTooltipCoords && (
            <div className="tooltip-flottant">
              ℹ️ Conversion géographique :<br />
              1° = 60′ <br />
              1’ = 60’’
            </div>
          )}

          {/* Champ de saisie finale */}
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
