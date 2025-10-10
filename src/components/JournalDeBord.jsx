// src/components/JournalDeBord.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { JournalContext } from "../context/JournalContext";

export default function JournalDeBord() {
  const { messages } = useContext(JournalContext);
  const containerRef = useRef(null);

  // ✅ Par défaut : le journal démarre replié
  const [isMinimized, setIsMinimized] = useState(true);

  // ✅ Fait défiler automatiquement vers le bas quand un message arrive (si ouvert)
  useEffect(() => {
    if (containerRef.current && !isMinimized) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  // ✅ Permet d’ouvrir/fermer manuellement
  const toggleMinimize = () => setIsMinimized((prev) => !prev);

  // ✅ Écoute un événement global envoyé quand on change d’énigme
  useEffect(() => {
    const handleFoldEvent = () => setIsMinimized(true); // referme à chaque changement d’énigme
    window.addEventListener("foldJournal", handleFoldEvent);
    return () => window.removeEventListener("foldJournal", handleFoldEvent);
  }, []);

  return (
    <div className={`journal-bord ${isMinimized ? "reduit" : ""}`}>
      {/* En-tête avec bouton pour ouvrir/fermer */}
      <div className="journal-header" onClick={toggleMinimize}>
        📖 Journal de bord
        <button className="toggle-btn">
          {isMinimized ? "▲" : "▼"}
        </button>
      </div>

      {/* Contenu affiché uniquement si non replié */}
      {!isMinimized && (
        <div className="journal-content" ref={containerRef}>
          {messages.map((msg, index) => (
            <div key={index} className="journal-message">
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
