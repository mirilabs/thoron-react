import React, { useState, useEffect, createContext } from 'react';
import Game from '../game/Game';
import UIEventEmitter from '../utils/UIEventEmitter';

const ThoronContext: React.Context<{ uiEvents: UIEventEmitter }> = (
  createContext({ uiEvents: undefined })
);

function ThoronProvider({ chapter, children }) {
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

export default ThoronContext
export {
  ThoronProvider
}