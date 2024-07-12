import "./Layout.scss";
import React from "react";
import useResponsive from "components/utils/useResponsive";
import { WindowSize } from "components/ViewportContext";

// COMPONENTS
import { SideMenuToggle } from "components/SideMenu";
import GameCanvas from './components/GameCanvas';
import UnitPanel from './components/UnitPanel';
import UnitDetail from 'components/UnitDetail';

function Layout() {
  let { size } = useResponsive();

  switch(size) {
    case WindowSize.SMALL:
    default:
      return (
        <div className="layout-mobile">
          <SideMenuToggle />
          <GameCanvas />
          <UnitPanel />
          <UnitDetail />
        </div>
      );
  }
}

export default Layout;