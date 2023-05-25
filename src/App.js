import './stylesheets/App.css';
import './stylesheets/components.css';
import map from './data/map.js';
import Provider from './components/Provider';
import GameWindow from './components/GameWindow';
import Chapter from 'thoron';

function App() {
  const chapter = new Chapter({ map: map });
  console.log(chapter);

  return (
    <div className="App">
      <header className="App-header">
        <Provider chapter={chapter}>
          <GameWindow />
        </Provider>
      </header>
    </div>
  );
}

export default App;
