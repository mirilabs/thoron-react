import React, { useState, useEffect } from 'react';
import { ThoronContext } from './ThoronContext';
import Game from '../game/Game';

function Provider({ chapter, children }) {
  let [canvas, setCanvas] = useState(null);
  let [api, setApi] = useState(null);
  
  useEffect(() => {
    if (chapter && canvas) {
      let game = new Game(chapter);
      game.setCanvas(canvas);

      setApi({
        uiEvents: game.uiEvents
      });

      return function cleanup() {
        game.unsetCanvas();
      }
    }
  }, [chapter, canvas])

  let value = {
    chapter,
    ...api,
    canvas,
    setCanvas
  }

  return (
    <ThoronContext.Provider value={value}>
      {children}
    </ThoronContext.Provider>
  )
}

export default Provider