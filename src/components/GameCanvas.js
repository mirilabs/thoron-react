import React, { useCallback, useContext } from 'react';
import ThoronContext from "./ThoronContext.js";
import defaults from '../utils/defaults.js';
import "./GameCanvas.css";

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
    <div id="game-canvas-container">
      <canvas id="game-canvas" ref={canvasRef} {...{width, height}} />
    </div>
  )
}

export default GameWindow