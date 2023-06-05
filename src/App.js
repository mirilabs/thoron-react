import './stylesheets/App.css';
import './stylesheets/dev.css';

import chapter from './data/chapter';

import Provider from './components/Provider';
import GameCanvas from './components/GameCanvas';
import TilePanel from './components/TilePanel';
import UnitPanel from './components/UnitPanel';

import renderObject from './utils/renderObject';

global.chapter = chapter;

function App() {
  return (
    <div className="App">
      <main>
        <Provider chapter={chapter}>
          <div className="canvas-container">
            <GameCanvas />
          </div>
          <div className="panels-container">
            <TilePanel render={renderObject} />
            <UnitPanel render={renderObject} />
          </div>
        </Provider>
      </main>
    </div>
  );
}

export default App;
