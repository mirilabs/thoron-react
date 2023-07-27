import React, { useState } from 'react';
import useControllerEventListener from './useControllerEvents';

function TilePanel({ render }) {
  const [data, setData] = useState(null);
  
  useControllerEventListener('select_tile', tile => {
    setData(tile);
  })

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