import React, { useContext } from 'react';
import ThoronContext from './ThoronContext';
import { useControllerSelector } from './utils/reduxHooks';

function TilePanel({ render }) {
  const { chapter } = useContext(ThoronContext);
  const coords = useControllerSelector(state => state.position);
  const tile = chapter.terrain.get(coords.x, coords.y);

  if (render) {
    return render(tile);
  }
  else {
    return (
      <div>
        {JSON.stringify(tile)}
      </div>
    )
  }
}

export default TilePanel;