import './stylesheets/App.css';
import './stylesheets/components.css';

import chapter from './data/chapter';

import Provider from './components/Provider';
import GameCanvas from './components/GameCanvas';
import TilePanel from './components/TilePanel';

global.chapter = chapter;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider chapter={chapter}>
          <GameCanvas />
          <TilePanel />
        </Provider>
      </header>
    </div>
  );
}

export default App;
