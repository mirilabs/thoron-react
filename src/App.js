import "./App.css";
import "./stylesheets/dev.css";

import { ViewportProvider } from "./components/ViewportContext";
import { ThoronProvider } from "./components/ThoronContext";
import chapter from "./data/chapter";
import { Provider as ReduxProvider } from "react-redux";
import controllerStore from "shared/store";
import { KeybindInitializer } from "components/config/keybinds";
import LayoutRoot from "Layout";
import { initializeUserSettings } from "components/config/userSettings";

initializeUserSettings();

function App() {
  return (
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
  );
}

export default App;
