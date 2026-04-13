import React, { useState, useEffect, createContext } from 'react';
import Game from '../../game/Game';
import UIEventEmitter from '../../shared/UIEventEmitter';
import Chapter, { Controller, IChapterSaveState, SaveState } from 'thoron';
import db from '@/data/db';

type ThoronContextState = {
  saveState: SaveState,
  controller: Controller,
  chapter: Chapter,
  uiEvents?: UIEventEmitter,
  canvas: HTMLCanvasElement,
  setCanvas: (canvas: HTMLCanvasElement) => void,
  save: () => void
}

const ThoronContext: React.Context<ThoronContextState> = createContext({
  saveState: null,
  controller: null,
  chapter: null,
  uiEvents: null,
  canvas: null,
  setCanvas: null,
  save: null
});

function ThoronProvider({ chapterId, saveState, children }: {
  chapterId: number,
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
    const save = () => {
      db.chapters.update(chapterId, {
        save: controller.save()
      });
    }

    setApi({
      ...api,
      saveState,
      controller,
      chapter,
      save
    });
  }, [chapterId, saveState]);

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