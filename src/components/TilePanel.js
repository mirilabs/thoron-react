import React, { useState } from 'react';
import useUIAction from './utils/useUIAction';

function TilePanel({ render }) {
  const [data, setData] = useState(null);

  useUIAction('select_tile', (tile) => {
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