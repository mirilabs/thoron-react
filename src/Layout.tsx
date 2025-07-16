import "./Layout.scss";
import "./stylesheets/themes.scss";
import React from "react";
import useResponsive from "@/app/utils/useResponsive";
import { WindowSize } from "@/app/ViewportContext";

// COMPONENTS
import GameCanvas from '@/app/GameView/GameCanvas';
import ActionUI from "@/app/GameView/ActionMenu";
import UnitSummary from "@/app/UnitSummary";
import GameMenuContainer from "@/app/GameMenu";
import ControlPanelContainer from "@/app/ControlPanel";

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