import React, { useState, useContext } from 'react';
import ThoronContext from './ThoronContext';
import useEventListener from './utils/useEventListener';

function TilePanel({ render }) {
  const { uiEvents } = useContext(ThoronContext);
  const [data, setData] = useState(null);
  
  useEventListener(uiEvents, 'select_tile', tile => {
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