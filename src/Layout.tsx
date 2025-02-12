import "./Layout.scss";
import "./stylesheets/themes.scss";
import React from "react";
import useResponsive from "components/utils/useResponsive";
import { WindowSize } from "components/ViewportContext";

// COMPONENTS
import GameCanvas from './components/gameView/GameCanvas';
import ActionUI from "components/gameView/ActionMenu";
import UnitSummary from "components/UnitSummary";
import GameMenuContainer from "components/GameMenu";
import ControlPanelContainer from "components/ControlPanel";

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
      );
  }
}

export default Layout;