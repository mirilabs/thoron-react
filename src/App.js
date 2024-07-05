import './stylesheets/App.css';
import './stylesheets/dev.css';

import chapter from './data/chapter';

import { ThoronProvider } from './components/ThoronContext';
import GameCanvas from './components/GameCanvas';
import TilePanel from './components/TilePanel';
import UnitPanel from './components/UnitPanel';
import UnitList from './components/UnitList';
import ActionMenu from './components/ActionMenu';

import renderObject from './utils/renderObject';

global.chapter = chapter;

function App() {
  return (
    <div className="App">
      <main>
        <ThoronProvider chapter={chapter}>
          <div className="canvas-container">
            <GameCanvas />
          </div>
          <div className="panels-container">
            <TilePanel render={renderObject} />
            <UnitPanel render={renderObject} />
            <UnitList render={renderObject} />
            <ActionMenu />
          </div>
        </ThoronProvider>
      </main>
    </div>
  );
}

export default App;
