import "./App.scss";
import "./stylesheets/dev.css";
import "./stylesheets/themes.scss";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "@/app/gameplay/utils/fallbackRender";
import { ViewportProvider } from "@/app/gameplay/ViewportContext";
import { initializeUserSettings } from "@/app/gameplay/ControlPanel/Settings/userSettings";
import Router from "./Router";

initializeUserSettings();

export default function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <ViewportProvider>
        <Router />
      </ViewportProvider>
    </ErrorBoundary>
  );
}