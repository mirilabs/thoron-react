import React, { useState, useEffect, createContext } from 'react';
import Game from '../../game/Game';
import UIEventEmitter from '../../shared/UIEventEmitter';
import Chapter, { Controller, IChapterSaveState } from 'thoron';

type ThoronContextState = {
  save: IChapterSaveState,
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
  saveState: IChapterSaveState,
  children: React.ReactNode
}) {
  const [api, setApi] = useState({} as ThoronContextState);
  const [canvas, setCanvas] = useState(null);

  // on initial render or when saveState changes,
  // create new controller and chapter from saveState
  useEffect(() => {
    const controller = Controller.load(saveState);
    const chapter = controller.chapter;
    setApi({
      ...api,
      save: saveState,
      controller,
      chapter
    });
  }, [saveState]);

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

  // values exposed to components that use this context
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