import "./Layout.scss";
import React from "react";
import useResponsive from "components/utils/useResponsive";
import { WindowSize } from "components/ViewportContext";

// COMPONENTS
import { SideMenuToggle } from "components/SideMenu";
import GameCanvas from './components/gameView/GameCanvas';
import ActionUI from "components/gameView/UnitController";
import UnitSummary from "components/UnitSummary";
import UnitDetail from "components/UnitDetail";

function Layout() {
  let { size } = useResponsive();

  switch(size) {
    case WindowSize.SMALL:
    default:
      return (
        <div className="layout-mobile">
          <div className="gui-layer">
            <UnitSummary />
            <UnitDetail />
          </div>
          <div className="gui-layer">
            <ActionUI />
            <SideMenuToggle />
          </div>
          <GameCanvas />
        </div>
      );
  }
}

export default Layout;