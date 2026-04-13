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

  // make <canvas> accessible to ThoronContext
  const canvasRef = useCallback(node => {
    setCanvas(node);
  }, [setCanvas]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

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