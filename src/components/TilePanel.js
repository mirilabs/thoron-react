import React, { useContext, useState } from 'react';
import useUIAction from './utils/useUIAction';
import ThoronContext from './ThoronContext';

function TilePanel({ render }) {
  const { chapter } = useContext(ThoronContext);
  const [data, setData] = useState(null);

  useUIAction('select_position', ({ x, y }) => {
    const tile = chapter.terrain.get(x, y);
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