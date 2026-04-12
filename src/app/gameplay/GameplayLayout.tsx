import React from "react";
import "./GameplayLayout.scss";
import GameCanvas from "./GameView/GameCanvas";
import ActionUI from "./GameView/ActionMenu";
import UnitSummary from "./UnitSummary";
import GameMenuContainer from "./GameMenu";
import ControlPanelContainer from "./ControlPanel";
import useResponsive, { WindowSize } from "../utils/useResponsive";

function SmallLayout() {
  return (
    <div className="layout-mobile">
      <div className="gui-layer">
        <UnitSummary />
      </div>
      <div className="gui-layer">
        <GameMenuContainer />
      </div>
      <div className="gui-layer">
        <ControlPanelContainer />
      </div>
      <div className="gui-layer">
        <ActionUI />
      </div>
      <GameCanvas />
    </div>
  )
}

function LargeLayout() {
  return (
    <div className="flex flex-row w-full h-full">
      {/* Game View Side */}
      <div className={
        "flex-1 relative h-full overflow-hidden " +
        "border-r border-[var(--text-color-2)]/20"
      }>
        <div className="gui-layer">
          <UnitSummary />
        </div>
        <div className="gui-layer">
          <GameMenuContainer />
        </div>
        <div className="gui-layer">
          <ActionUI />
        </div>
        <GameCanvas />
      </div>

      {/* Control Panel Side */}
      <div className={
        "h-full overflow-hidden " +
        "w-[33%] min-w-[320px] max-w-[480px]"
      }>
        <ControlPanelContainer variant="static" />
      </div>
    </div>
  )
}

function GameplayLayout() {
  const { size } = useResponsive();

  switch (size) {
    case WindowSize.SMALL:
      return <SmallLayout />;
    case WindowSize.LARGE:
      return <LargeLayout />;
    default:
      return <SmallLayout />;
  }
}

export default GameplayLayout;