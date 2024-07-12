import './App.css';
import './stylesheets/dev.css';

import chapter from './data/chapter';

import { ThoronProvider } from './components/ThoronContext';
import { ViewportProvider } from './components/ViewportContext';
import { KeybindHandler } from 'components/utils/useUIAction';
import LayoutRoot from 'Layout';

global.chapter = chapter;

function App() {
  return (
    <ViewportProvider>
      <ThoronProvider chapter={chapter}>
        <main className="app">
          <LayoutRoot />
        </main>
        <KeybindHandler />
      </ThoronProvider>
    </ViewportProvider>
  );
}

export default App;
