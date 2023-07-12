import React, { useContext, useEffect, useState } from 'react';
import { ThoronContext } from './ThoronContext';

function TilePanel({ render }) {
  const { chapter, canvasEventHandler } = useContext(ThoronContext);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (chapter != null && canvasEventHandler != null) {
      const cb = (x, y) => {
        let tile = chapter.terrain.getTile([x, y], true);
        if (tile == null) return;
        setData(tile)
      }
      canvasEventHandler.on('mousemove', cb);

      return function cleanup() {
        canvasEventHandler.off('mousemove', cb);
      }
    }
  }, [chapter, canvasEventHandler])

  if (render) {
    return render(data);
  }
  else {
    return (
      <div>
        {JSON.stringify(data)}
      </div>
    )
  }
}

export default TilePanel;