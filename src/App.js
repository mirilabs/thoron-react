import "./App.scss";
import "./stylesheets/dev.css";

import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "components/utils/fallbackRender";
import { ViewportProvider } from "./components/ViewportContext";
import { ThoronProvider } from "./components/ThoronContext";
import chapter from "./data/chapter";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "shared/store";
import { KeybindInitializer } from "components/ControlPanel/Settings/keybinds";
import LayoutRoot from "Layout";
import { initializeUserSettings } from "components/ControlPanel/Settings/userSettings";

initializeUserSettings();

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <ViewportProvider>
        <ThoronProvider chapter={chapter}>
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
