// src/context/JournalContext.jsx
import React, { createContext, useState } from "react";

// Création du contexte partagé
export const JournalContext = createContext();

// Fournisseur du contexte
export const JournalProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    "Initialisation du Journal de Bord",
    "Connexion au système ARC en cours...",
  ]);

  // Fonction pour ajouter un nouveau message
  const addMessage = (newMsg) => {
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <JournalContext.Provider value={{ messages, addMessage }}>
      {children}
    </JournalContext.Provider>
  );
};
