import './App.css';
import './stylesheets/dev.css';

import chapter from './data/chapter';

import { ThoronProvider } from './components/ThoronContext';
import { ViewportProvider } from './components/ViewportContext';
import GameCanvas from './components/GameCanvas';
import UnitPanel from './components/UnitPanel';
import UnitDetail from 'components/UnitDetail';

global.chapter = chapter;

function App() {
  return (
    <main className="app">
      <ViewportProvider>
        <ThoronProvider chapter={chapter}>
          <GameCanvas />
          <UnitPanel />
          <UnitDetail />
        </ThoronProvider>
      </ViewportProvider>
    </main>
  );
}

export default App;
