import React from "react";
import "./GameplayLayout.scss";
import GameCanvas from "./GameView/GameCanvas";
import ActionUI from "./GameView/ActionMenu";
import UnitSummary from "./UnitSummary";
import GameMenuContainer from "./GameMenu";
import ControlPanelContainer from "./ControlPanel";
import useResponsive, { WindowSize } from "./utils/useResponsive";

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
    <div>
      <div className="layout-desktop">
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
      <div>
        <ControlPanelContainer />
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