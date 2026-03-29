import "./GameplayRoot.scss";
import React from "react";
import useResponsive from "@/app/gameplay/utils/useResponsive";
import { WindowSize } from "@/app/gameplay/ViewportContext";
import MUITheme from "@/stylesheets/MUITheme";

// COMPONENTS
import GameCanvas from '@/app/gameplay/GameView/GameCanvas';
import ActionUI from "@/app/gameplay/GameView/ActionMenu";
import UnitSummary from "@/app/gameplay/UnitSummary";
import GameMenuContainer from "@/app/gameplay/GameMenu";
import ControlPanelContainer from "@/app/gameplay/ControlPanel";

// CONTEXTS
import { ThoronProvider } from "./ThoronContext";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "@/shared/store";
import { KeybindInitializer } from "@/app/gameplay/ControlPanel/Settings/keybinds";
import { ThemeProvider } from "@mui/material";

import saveState from "@/data/saveState";

function Layout() {
  let { size } = useResponsive();

  switch (size) {
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

const rngState = {
  seed: 0,
  state: 0
}

function GameplayRoot() {
  return (
    <ThoronProvider saveState={{ ...saveState, rngState }}>
      <ReduxProvider store={controllerStore}>
        <ThemeProvider theme={MUITheme}>
          <div className="gameplay-root">
            <Layout />
          </div>
          <> {/* config */}
            <KeybindInitializer />
          </>
        </ThemeProvider>
      </ReduxProvider>
    </ThoronProvider>
  )
}

export default GameplayRoot;