import React, { useCallback, useContext } from 'react';
import { ThoronContext } from "./ThoronContext.js";
import defaults from '../utils/defaults.js';

function GameWindow({ rendererOpts = {} }) {
  const {
    chapter,
    setCanvas
  } = useContext(ThoronContext);

  const canvasRef = useCallback(node => {
    setCanvas(node);
  }, [setCanvas]);

  // determine size of <canvas>
  let { width, height } = chapter.terrain.grid;
  width = width * (rendererOpts.tileWidth || defaults.TILE_SIZE);
  height = height * (rendererOpts.tileHeight || defaults.TILE_SIZE);

  return (
    <canvas className="thoron__renderer" ref={canvasRef}
      {...{ width, height }} />
  )
}

export default GameWindow