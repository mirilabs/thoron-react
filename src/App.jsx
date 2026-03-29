import "./App.scss";
import "./stylesheets/dev.css";
import "./stylesheets/themes.scss";
import MUITheme from "./stylesheets/MUITheme";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "@/app/utils/fallbackRender";
import { ViewportProvider } from "@/app/ViewportContext";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "@/shared/store";
import { KeybindInitializer } from "@/app/ControlPanel/Settings/keybinds";
import GameplayRoot from "./app/GameplayRoot";
import { initializeUserSettings } from "@/app/ControlPanel/Settings/userSettings";
import { ThemeProvider } from "@mui/material";

import { ThoronProvider } from "@/app/ThoronContext";
import saveState from "./data/saveState";

initializeUserSettings();

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <ViewportProvider>
        <ThoronProvider saveState={saveState}>
          <ReduxProvider store={controllerStore}>
            <ThemeProvider theme={MUITheme}>
              <div className="root">
                <GameplayRoot />
              </div>
              <> {/* config */}
                <KeybindInitializer />
              </>
            </ThemeProvider>
          </ReduxProvider>
        </ThoronProvider>
      </ViewportProvider>
    </ErrorBoundary>
  );
}

export default App;
