import React, { useState, useEffect, createContext } from 'react';
import Game from '../game/Game';
import UIEventEmitter from '../shared/UIEventEmitter';
import Chapter, { Controller } from 'thoron';

type ThoronContextState = {
  save: any,
  controller: Controller,
  chapter: Chapter,
  uiEvents?: UIEventEmitter,
  canvas: HTMLCanvasElement,
  setCanvas: (canvas: HTMLCanvasElement) => void
}

const ThoronContext: React.Context<ThoronContextState> = createContext({
  save: null,
  controller: null,
  chapter: null,
  uiEvents: null,
  canvas: null,
  setCanvas: null
});

function ThoronProvider({ saveState, children }: {
  saveState: any,
  children: React.ReactNode
}) {
  // create Thoron controller from saveState
  function getInitialState(save: any): Partial<ThoronContextState> {
    const controller = Controller.load(save);
    const chapter = controller.chapter;

    return {
      save,
      controller,
      chapter
    }
  }

  const [api, setApi] = useState(getInitialState(saveState));
  const [canvas, setCanvas] = useState(null);
  
  // when canvas is set, create Game object and attach canvas to it
  useEffect(() => {
    if (canvas) {
      let game = new Game(api.controller);
      game.setCanvas(canvas);

      setApi((api) => ({
        ...api,
        uiEvents: game.uiEvents
      }));

      return function cleanup() {
        game.unsetCanvas();
      }
    }
  }, [api.controller, canvas])

  // exposed to components that use ThoronContext
  let value: ThoronContextState = {
    ...api as ThoronContextState,
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