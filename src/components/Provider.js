import React, { useState, useEffect } from 'react';
import { ThoronContext } from '../utils/ThoronContext.js';
import Controller from '../controllers/Controller.js';
import Renderer from '../controllers/Renderer.js';
import ChapterRenderer from '../controllers/ChapterRenderer.js';
import CanvasEventHandler from '../controllers/CanvasEventHandler.js';
import CoordinateConverter from '../controllers/lib/CoordinateConverter.js';

function Provider({ chapter, children }) {
  let [canvas, setCanvas] = useState(null);
  let [api, setApi] = useState(null);
  
  useEffect(() => {
    if (chapter && canvas) {
      let coords = new CoordinateConverter(64, 64, canvas);

      let canvasEventHandler = new CanvasEventHandler(coords);
      canvasEventHandler.attachCanvas(canvas);

      let renderer = new ChapterRenderer(canvas, coords);
      renderer.subscribe(chapter);

      let controller = new Controller(chapter, canvasEventHandler);

      setApi({
        controller,
        canvasEventHandler,
        renderer
      });

      return function cleanup() {
        canvasEventHandler.detachCanvas(canvas);
        renderer.unsubscribe();
      }
    }
  }, [chapter, canvas])

  let value = {
    chapter,
    ...api,
    canvas, setCanvas
  }

  return (
    <ThoronContext.Provider value={value}>
      {children}
    </ThoronContext.Provider>
  )
}

export default Provider