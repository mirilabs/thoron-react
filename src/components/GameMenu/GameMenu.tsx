import "./GameMenu.scss";
import React from 'react';

function GameMenu() {
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