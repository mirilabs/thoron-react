import React, { useContext, useEffect, useState } from 'react';
import { ThoronContext } from '../utils/ThoronContext';

function TilePanel({ render }) {
  const { chapter, controller } = useContext(ThoronContext);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (chapter != null && controller != null) {
      const listener = event => {
        let coords = controller.getTileCoordsAtCursor(event);
        if (coords == null) return;

        let tile = chapter.terrain.getTile(coords, true);
        if (tile == null) return;
        
        setData(tile)
      }
      controller.canvas.addEventListener('mouseenter', listener);
      controller.canvas.addEventListener('mousemove', listener);

      return function cleanup() {
        controller.canvas.removeEventListener('mouseenter', listener);
        controller.canvas.removeEventListener('mousemove', listener);
      }
    }
  }, [chapter, controller])

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