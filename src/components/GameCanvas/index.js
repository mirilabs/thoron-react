import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThoronContext } from "../../utils/ThoronContext.js";
import Renderer from './Renderer.js'
import defaults from './defaults.js';

let renderer;

function GameWindow({ rendererOpts = {} }) {
  const { chapter, setCanvas } = useContext(ThoronContext);

  const canvasRef = useRef();
  
  // determine size of <canvas>
  let { width, height } = chapter.terrain.grid;
  width = width * (rendererOpts.tileWidth || defaults.TILE_SIZE);
  height = height * (rendererOpts.tileHeight || defaults.TILE_SIZE);

  useEffect(() => {
    if (canvasRef.current) {
      let canvas = canvasRef.current;
      setCanvas(canvas);
      renderer = new Renderer(chapter, canvas, rendererOpts);
    }
  }, [setCanvas, chapter, rendererOpts]);
  
  if (renderer) {
    renderer.draw()
  }

  return (
    <canvas className="thoron__renderer" ref={canvasRef}
      {...{ width, height }} />
  )
}

export default GameWindow