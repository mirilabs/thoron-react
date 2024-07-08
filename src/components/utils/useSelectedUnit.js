import { useState } from 'react';
import useUIAction from './useUIAction';

function useSelectedUnit() {
  const [unit, setUnit] = useState(null);

  useUIAction('select_unit', (unit) => {
    if (unit !== null) setUnit(unit);
  })

  return unit;
}

export default useSelectedUnit;