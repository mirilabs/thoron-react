import "./App.scss";
import "./stylesheets/dev.css";
import "./stylesheets/themes.scss";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "@/app/utils/fallbackRender";
import { ViewportProvider } from "@/app/ViewportContext";
import GameplayRoot from "./app/GameplayRoot";
import { initializeUserSettings } from "@/app/ControlPanel/Settings/userSettings";

initializeUserSettings();

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <ViewportProvider>
        <GameplayRoot />
      </ViewportProvider>
    </ErrorBoundary>
  );
}

export default App;