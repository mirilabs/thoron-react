import { useUIEmitter } from "@/app/utils/useUIAction";
import "./GameMenu.scss";
import React, { useContext } from 'react';
import ThoronContext from "@/app/ThoronContext";

interface GameMenuProps {
  handleClose: () => void;
}

function GameMenu({ handleClose }: GameMenuProps) {
  const { controller } = useContext(ThoronContext);

  const endPhase = () => {
    controller.pushAction({
      command: "end_phase"
    });
  }
  const openLog = useUIEmitter("open_chapter_log");
  const openCharacter = useUIEmitter("open_character_detail");
  const openSettings = useUIEmitter("open_settings");

  const handleEndPhase = () => { handleClose(); endPhase() }
  const handleOpenLog = () => { handleClose(); openLog() }
  const handleOpenCharacters = () => { handleClose(); openCharacter() }
  const handleOpenSettings = () => { handleClose(); openSettings() }

  return (
    <ul className="game-menu__options">
      <li onClick={handleEndPhase}>
        End Phase
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