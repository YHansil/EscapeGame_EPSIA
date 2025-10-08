// src/components/PuzzleImage.jsx
import React, { useState, useEffect } from "react";
import "../styles/enigmes.css";

/**
 * PuzzleImage — Puzzle 4x4 simple à clic pour échanger deux tuiles
 * Props :
 *  - imageSrc : chemin de l’image complète
 *  - taille : nombre de tuiles par ligne (4 pour 4x4)
 *  - onResolve : callback quand le puzzle est complété
 */
export default function PuzzleImage({ imageSrc, taille = 4, onResolve }) {
  const total = taille * taille;
  const initialTiles = Array.from({ length: total }, (_, i) => i);
  const [tiles, setTiles] = useState(shuffle(initialTiles));
  const [selected, setSelected] = useState(null);

  // Mélange des tuiles
  function shuffle(array) {
    return array
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  // Gestion du clic
  const handleTileClick = (index) => {
    if (selected === null) {
      setSelected(index);
    } else {
      const newTiles = [...tiles];
      [newTiles[selected], newTiles[index]] = [
        newTiles[index],
        newTiles[selected],
      ];
      setTiles(newTiles);
      setSelected(null);
    }
  };

  // Vérification si puzzle résolu
  useEffect(() => {
    const solved = tiles.every((val, i) => val === i);
    if (solved) onResolve();
  }, [tiles]);

  return (
    <div
      className="puzzle-container"
      style={{
        gridTemplateColumns: `repeat(${taille}, 1fr)`,
        width: "400px",
        height: "400px",
      }}
    >
      {tiles.map((tile, i) => (
        <div
          key={i}
          className={`tile ${selected === i ? "selected" : ""}`}
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${taille * 100}% ${taille * 100}%`,
            backgroundPosition: `${(tile % taille) * (100 / (taille - 1))}% ${
              Math.floor(tile / taille) * (100 / (taille - 1))
            }%`,
          }}
          onClick={() => handleTileClick(i)}
        ></div>
      ))}
    </div>
  );
}
