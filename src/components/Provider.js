import React, { useState, useEffect } from 'react';
import { ThoronContext } from '../utils/ThoronContext.js';
import Controller from '../controllers/Controller.js';
import Renderer from '../controllers/Renderer.js';

function Provider({ chapter, children }) {
  let [canvas, setCanvas] = useState(null);
  let [controller, setController] = useState(null);
  
  useEffect(() => {
    if (chapter && canvas) {
      let renderer = new Renderer(canvas);
      let controller = new Controller(chapter, renderer);
      setController(controller);
    }
  }, [chapter, canvas])

  let value = {
    chapter,
    controller,
    canvas, setCanvas
  }

  return (
    <ThoronContext.Provider value={value}>
      {children}
    </ThoronContext.Provider>
  )
}

export default Provider