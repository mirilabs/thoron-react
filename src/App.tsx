import "./App.scss";
import "./stylesheets/dev.css";
import "./stylesheets/themes.scss";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "@/app/utils/fallbackRender";
import { ViewportProvider } from "@/app/ViewportContext";
import { initializeUserSettings } from "@/app/ControlPanel/Settings/userSettings";
import Navigation from "./Navigation";
import Router from "./Router";

initializeUserSettings();

function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Router />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <ViewportProvider>
        <Layout />
      </ViewportProvider>
    </ErrorBoundary>
  );
}