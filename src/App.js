import "./App.scss";
import "./stylesheets/dev.css";

import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "components/utils/fallbackRender";
import { ViewportProvider } from "./components/ViewportContext";
import { ThoronProvider } from "./components/ThoronContext";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "shared/store";
import { KeybindInitializer } from "components/ControlPanel/Settings/keybinds";
import LayoutRoot from "Layout";
import { initializeUserSettings } from "components/ControlPanel/Settings/userSettings";
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
