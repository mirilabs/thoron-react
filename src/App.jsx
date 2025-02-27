import "./App.scss";
import "./stylesheets/dev.css";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "@/app/utils/fallbackRender";
import { ViewportProvider } from "@/app/ViewportContext";
import { ThoronProvider } from "@/app/ThoronContext";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "@/shared/store";
import { KeybindInitializer } from "@/app/ControlPanel/Settings/keybinds";
import LayoutRoot from "./Layout";
import { initializeUserSettings } from "@/app/ControlPanel/Settings/userSettings";
import saveState from "./data/saveState";

initializeUserSettings();

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <ViewportProvider>
        <ThoronProvider saveState={saveState}>
          <ReduxProvider store={controllerStore}>
            <main className="app">
              <LayoutRoot />
            </main>
            <> {/* initializers */}
              <KeybindInitializer />
            </>
          </ReduxProvider>
        </ThoronProvider>
      </ViewportProvider>
    </ErrorBoundary>
  );
}

export default App;
