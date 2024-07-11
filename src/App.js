import './App.css';
import './stylesheets/dev.css';

import chapter from './data/chapter';

import { ThoronProvider } from './components/ThoronContext';
import { ViewportProvider } from './components/ViewportContext';
import GameCanvas from './components/GameCanvas';
import UnitPanel from './components/UnitPanel';
import UnitDetail from 'components/UnitDetail';
import { KeybindHandler } from 'components/utils/useUIAction';
import SettingsContainer from 'components/Settings';

global.chapter = chapter;

function App() {
  return (
    <main className="app">
      <ViewportProvider>
        <ThoronProvider chapter={chapter}>
          <SettingsContainer />
          <GameCanvas />
          <UnitPanel />
          <UnitDetail />
          <KeybindHandler />
        </ThoronProvider>
      </ViewportProvider>
    </main>
  );
}

export default App;
