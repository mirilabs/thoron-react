import { useUIEmitter } from "components/utils/useUIAction";
import "./GameMenu.scss";
import React from 'react';

interface GameMenuProps {
  handleClose: () => void;
}

function GameMenu({ handleClose }: GameMenuProps) {
  const openLog = useUIEmitter("open_chapter_log");
  const openCharacter = useUIEmitter("open_character_detail");
  const openSettings = useUIEmitter("open_settings");

  const handleOpenLog = () => { handleClose(); openLog() }
  const handleOpenCharacters = () => { handleClose(); openCharacter() }
  const handleOpenSettings = () => { handleClose(); openSettings() }

  return (
    <ul className="game-menu__options">
      <li>
        End Turn
      </li>
      <li onClick={handleOpenLog}>
        Log
      </li>
      <li onClick={handleOpenCharacters}>
        Characters
      </li>
      <li onClick={handleOpenSettings}>
        Settings
      </li>
    </ul>
  )
}

export default GameMenu;