import "./GameplayRoot.scss";
import React from "react";
import useResponsive from "./utils/useResponsive";
import { WindowSize } from "./ViewportContext";

// COMPONENTS
import GameCanvas from './GameView/GameCanvas';
import ActionUI from "./GameView/ActionMenu";
import UnitSummary from "./UnitSummary";
import GameMenuContainer from "./GameMenu";
import ControlPanelContainer from "./ControlPanel";

// CONTEXTS
import { ThoronProvider } from "./ThoronContext";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "@/shared/store";
import { KeybindInitializer } from "./ControlPanel/Settings/keybinds";

import { SaveState } from "thoron";

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

function GameplayRoot({ saveState }: { saveState: SaveState }) {
  return (
    <ThoronProvider saveState={{ ...saveState }}>
      <ReduxProvider store={controllerStore}>
        <div className="gameplay-root">
          <Layout />
        </div>
        <> {/* config */}
          <KeybindInitializer />
        </>
      </ReduxProvider>
    </ThoronProvider>
  )
}

export default GameplayRoot;