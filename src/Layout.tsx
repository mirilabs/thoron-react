import "./Layout.scss";
import React from "react";
import useResponsive from "components/utils/useResponsive";
import { WindowSize } from "components/ViewportContext";

// COMPONENTS
import GameCanvas from './components/gameView/GameCanvas';
import ActionUI from "components/gameView/UnitController";
import UnitSummary from "components/UnitSummary";
import ControlPanel from "components/ControlPanel";

function Layout() {
  let { size } = useResponsive();

  switch(size) {
    case WindowSize.SMALL:
    default:
      return (
        <div className="layout-mobile">
          <div className="gui-layer">
            <UnitSummary />
          </div>
          <div className="gui-layer">
            <ControlPanel />
          </div>
          <div className="gui-layer">
            <ActionUI />
          </div>
          <GameCanvas />
        </div>
      );
  }
}

export default Layout;