import { useState } from 'react';
import useUIAction from './useUIAction';

function useSelectedPosition() {
  const [pos, setPos] = useState(null);

  useUIAction("select_position", (position) => {
    if (position !== null) setPos(position);
  })

  return pos;
}

export default useSelectedPosition;