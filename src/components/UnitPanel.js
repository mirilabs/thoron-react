import React, { useContext, useEffect, useState } from 'react';
import { ThoronContext } from './ThoronContext';

function UnitPanel({ render }) {
  const { chapter, canvasEventHandler } = useContext(ThoronContext);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (chapter != null && canvasEventHandler != null) {
      const cb = (x, y) => {
        let unit = chapter.getUnitAt([x, y]);
        setData(unit)
      }
      canvasEventHandler.on('mousedown', cb)

      return function cleanup() {
        canvasEventHandler.off('mousedown', cb)
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

export default UnitPanel;