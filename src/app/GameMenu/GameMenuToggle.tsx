import React from "react";

function GameMenuToggle({ onClick }) {
  return (
    <button className="game-menu-toggle" onClick={onClick}>
      <i className="fas fa-bars" />
    </button>
  )
}

export default GameMenuToggle;