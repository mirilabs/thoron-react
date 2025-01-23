import "./GameCanvas.css";
import React, {
  useCallback,
  useContext,
  useRef
} from 'react';
import ThoronContext from "../ThoronContext";

function GameWindow() {
  const {
    setCanvas
  } = useContext(ThoronContext);
  
  // get dimensions from container
  const containerRef = useRef();

  // make <canvas> accessible to ThoronContext
  const canvasRef = useCallback(node => {
    setCanvas(node);
  }, [setCanvas]);

  let canvasOpts = {
    width: containerRef.current?.offsetWidth,
    height: containerRef.current?.offsetHeight
  }

  return (
    <div id="game-canvas-container" ref={containerRef} >
      <canvas id="game-canvas" ref={canvasRef} {...canvasOpts} />
    </div>
  )
}

export default GameWindow