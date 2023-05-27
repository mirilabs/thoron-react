import React, { useContext, useEffect, useState } from 'react';
import { ThoronContext } from '../utils/ThoronContext';

function UnitPanel({ render }) {
  const { chapter, controller } = useContext(ThoronContext);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (chapter != null && controller != null) {
      const listener = event => {
        let unit = controller.getUnitAtCursor(event, chapter);
        setData(unit)
      }
      controller.canvas.addEventListener('mousedown', listener);

      return function cleanup() {
        controller.canvas.removeEventListener('mousedown', listener);
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

export default UnitPanel;