import React, { useState, useEffect, createContext, useContext } from 'react';
import Game from '../../game/Game';
import UIEventEmitter from '../../shared/UIEventEmitter';
import Chapter, { Controller, IChapterSaveState, SaveState } from 'thoron';
import db from '@/data/db';

type ThoronContextState = {
  campaignId: number,
  chapterId: number,
  saveState: SaveState,
  controller: Controller,
  chapter: Chapter,
  uiEvents?: UIEventEmitter,
  canvas: HTMLCanvasElement,
  setCanvas: (canvas: HTMLCanvasElement) => void,
  save: () => void
}

const ThoronContext: React.Context<ThoronContextState> = createContext({
  campaignId: null,
  chapterId: null,
  saveState: null,
  controller: null,
  chapter: null,
  uiEvents: null,
  canvas: null,
  setCanvas: null,
  save: null
});

function ThoronProvider({ campaignId, chapterId, saveState, children }: {
  campaignId: number,
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
      const saveState = controller.save();
      db.chapters.update(chapterId, {
        save: saveState
      });
      console.log("Saved:", saveState);
    }

    setApi({
      campaignId,
      chapterId,
      ...api,
      saveState,
      controller,
      chapter,
      save
    });
  }, [campaignId, chapterId, saveState]);

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

function useThoronContext() {
  return useContext(ThoronContext);
}

export default ThoronContext
export {
  ThoronProvider,
  useThoronContext
}