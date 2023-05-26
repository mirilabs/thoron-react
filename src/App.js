import './stylesheets/App.css';
import './stylesheets/components.css';

import map from './data/map.js';
import Chapter from 'thoron';

import Provider from './components/Provider';
import GameCanvas from './components/GameCanvas';
import TilePanel from './components/TilePanel';

function App() {
  const chapter = new Chapter({ map: map });
  // console.log(chapter);

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
