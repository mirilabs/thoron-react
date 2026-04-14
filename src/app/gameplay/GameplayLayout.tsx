import React from "react";
import "./GameplayLayout.scss";
import GameCanvas from "./GameView/GameCanvas";
import ActionUI from "./GameView/ActionUI";
import UnitSummary from "./UnitSummary";
import GameMenuContainer from "./GameMenu";
import ControlPanelContainer from "./ControlPanel";
import useResponsive, { WindowSize } from "../utils/useResponsive";

function GameplayLayout() {
  const { size } = useResponsive();

  return (
    <div className="flex flex-row w-full h-full">
      {/* Game View Side */}
      <div className="flex-1 relative h-full overflow-hidden">
        <div className="gui-layer">
          <UnitSummary />
        </div>
        <div className="gui-layer">
          <GameMenuContainer />
        </div>
        <div className="gui-layer">
          <ActionUI />
        </div>
        {
          size <= WindowSize.MEDIUM ? (
            <div className="gui-layer">
              <ControlPanelContainer />
            </div>
          ) : null
        }
        <GameCanvas />
      </div>
      {/* Control Panel Side */}
      {
        size >= WindowSize.LARGE ? (
          <div className={
            "h-full overflow-hidden " +
            "w-[33%] min-w-[320px] max-w-[480px]"
          }>
            <ControlPanelContainer variant="static" />
          </div>
        ) : null
      }
    </div>
  )
}

export default GameplayLayout;