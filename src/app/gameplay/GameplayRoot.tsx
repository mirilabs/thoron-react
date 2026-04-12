import React from "react";

import GameplayLayout from "./GameplayLayout";
import { SaveState } from "thoron";

// CONTEXTS
import { ThoronProvider } from "./ThoronContext";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "@/shared/store";
import { KeybindInitializer } from "./ControlPanel/Settings/keybinds";

function GameplayRoot({ saveState }: { saveState: SaveState }) {
  return (
    <ThoronProvider saveState={{ ...saveState }}>
      <ReduxProvider store={controllerStore}>
        <div className="gameplay-root">
          <GameplayLayout />
        </div>
        <> {/* config */}
          <KeybindInitializer />
        </>
      </ReduxProvider>
    </ThoronProvider>
  )
}

export default GameplayRoot;