import React, { createContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const initialTime = 20 * 60; // 20 minutes en secondes
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const applyPenalty = () => {
    setTimeLeft((prev) => Math.max(0, prev - 10));
  };

  const stopTimer = () => {
    setTimeLeft(0);
    setIsGameOver(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <TimerContext.Provider value={{ timeLeft, isGameOver, applyPenalty, stopTimer, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};