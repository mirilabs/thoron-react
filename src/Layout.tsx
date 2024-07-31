import "./Layout.scss";
import React from "react";
import useResponsive from "components/utils/useResponsive";
import { WindowSize } from "components/ViewportContext";

// COMPONENTS
import { SideMenuToggle } from "components/SideMenu";
import GameCanvas from './components/gameView/GameCanvas';
import UnitPanel from './components/UnitPanel';
import UnitDetail from 'components/UnitDetail';
import ActionMenuToggle from "components/gameView/ActionMenu";

function Layout() {
  let { size } = useResponsive();

  switch(size) {
    case WindowSize.SMALL:
    default:
      return (
        <div className="layout-mobile">
          <UnitPanel />
          <SideMenuToggle />
          <GameCanvas />
          <ActionMenuToggle />
          <UnitDetail />
        </div>
      );
  }
}

export default Layout;