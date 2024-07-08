import { useState, useContext } from 'react';
import ThoronContext from '../ThoronContext';
import useEventListener from './useEventListener';

function useSelectedUnit() {
  const { uiEvents } = useContext(ThoronContext);
  const [unit, setUnit] = useState(null);

  useEventListener(uiEvents, 'select_unit', unit => {
    if (unit !== null) setUnit(unit);
  });

  return unit;
}

export default useSelectedUnit;