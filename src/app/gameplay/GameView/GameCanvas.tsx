import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import ThoronContext from "../ThoronContext";

function GameWindow() {
  const {
    setCanvas
  } = useContext(ThoronContext);

  // get dimensions from container
  const containerRef = useRef<HTMLDivElement>(null);

  const [canvasNode, setCanvasNode] = useState<HTMLCanvasElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  // make <canvas> accessible to ThoronContext
  const canvasRef = useCallback((node: HTMLCanvasElement | null) => {
    setCanvasNode(node);
  }, []);

  // setCanvas should only be called when the canvas element is ready
  // and has dimensions
  useEffect(() => {
    if (canvasNode && width > 0 && height > 0) {
      setCanvas(canvasNode);
    }
  }, [canvasNode, width, height, setCanvas]);

  // update dimensions when container resizes
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // Use borderBoxSize for offsetWidth/Height equivalent
        const { inlineSize, blockSize } = entry.borderBoxSize[0];
        setWidth(inlineSize);
        setHeight(blockSize);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  if (!(containerRef.current)) return (
    <div ref={containerRef}
      className="w-full h-full" />
  );

  return (
    <div ref={containerRef}
      className="w-full h-full absolute left-0 top-0 touch-none"
    >
      <canvas ref={canvasRef} width={width} height={height}
        className="border-1 border-black" />
    </div>
  )
}

export default GameWindow