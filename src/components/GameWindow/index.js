import React, { useContext, useEffect, useRef } from 'react';
import { ThoronContext } from "../../utils/ThoronContext";
import Renderer from './Renderer.js'
import defaults from './defaults.js';

function GameWindow({ rendererOpts = {} }) {
  const chapter = useContext(ThoronContext);
  const canvasRef = useRef(null);
  
  // determine size of <canvas>
  let { width, height } = chapter.terrain.grid;
  width = width * (rendererOpts.tileWidth || defaults.TILE_SIZE);
  height = height * (rendererOpts.tileHeight || defaults.TILE_SIZE);  

  // setup renderer
  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new Renderer(chapter, canvasRef, rendererOpts);
      renderer.draw();
    }
  }, [chapter, canvasRef, rendererOpts])

  return (
    <canvas className="thoron__renderer" ref={canvasRef}
      {...{ width, height }} />
  )
}

export default GameWindow