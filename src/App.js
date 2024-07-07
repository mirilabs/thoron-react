import './App.css';
import './stylesheets/dev.css';

import chapter from './data/chapter';

import { ThoronProvider } from './components/ThoronContext';
import GameCanvas from './components/GameCanvas';
import TilePanel from './components/TilePanel';
import UnitPanel from './components/UnitPanel';
import UnitList from './components/UnitList';
import ActionMenu from './components/ActionMenu';

import renderObject from './utils/renderObject';
import { ViewportProvider } from './components/ViewportContext';

global.chapter = chapter;

function App() {
  return (
    <main className="app">
      <ViewportProvider>
        <ThoronProvider chapter={chapter}>
          <GameCanvas />
          <UnitPanel />
          {/* <div className="panels-container">
            <TilePanel render={renderObject} />
            <UnitPanel render={renderObject} />
            <UnitList render={renderObject} />
            <ActionMenu />
          </div> */}
        </ThoronProvider>
      </ViewportProvider>
    </main>
  );
}

export default App;
