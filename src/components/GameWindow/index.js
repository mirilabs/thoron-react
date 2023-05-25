import React, { useContext, useEffect, useRef } from 'react';
import { ThoronContext } from "../../utils/ThoronContext";
import Renderer from './Renderer.js'

function GameWindow(props) {
  const {
    background,
    tileWidth = 32,
    tileHeight = 32
  } = props;

  const chapter = useContext(ThoronContext);
  
  // determine canvas size
  let { width, height } = chapter.terrain.grid;
  width = width * tileWidth;
  height = height * tileHeight;
  
  const canvasRef = useRef(null);
  const renderer = new Renderer(canvasRef, props);
  renderer.draw();

  return (
    <canvas className="thoron__map-view" ref={canvasRef}
      {...{ width, height }} />
  )
}

export default GameWindow