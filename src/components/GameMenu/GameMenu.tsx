import "./GameMenu.scss";
import React from 'react';

function GameMenu() {
  // TODO implement buttons
  return (
    <ul className="game-menu__options">
      <li>
        End Turn
      </li>
      <li>
        Log
      </li>
      <li>
        Characters
      </li>
      <li>
        Settings
      </li>
    </ul>
  )
}

export default GameMenu;