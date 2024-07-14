import "./App.css";
import "./stylesheets/dev.css";

import chapter from "./data/chapter";

import { ThoronProvider } from "./components/ThoronContext";
import { ViewportProvider } from "./components/ViewportContext";
import { KeybindInitializer } from "components/config/keybinds";
import LayoutRoot from "Layout";
import { initializeUserSettings } from "components/config/userSettings";

initializeUserSettings();

function App() {
  return (
    <ViewportProvider>
      <ThoronProvider chapter={chapter}>
        <main className="app">
          <LayoutRoot />
        </main>
        <> {/* initializers */}
          <KeybindInitializer />
        </>
      </ThoronProvider>
    </ViewportProvider>
  );
}

export default App;
