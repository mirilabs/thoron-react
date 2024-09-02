import { useState } from 'react';
import useUIAction from './useUIAction';

function useSelectedUnit() {
  const [unit, setUnit] = useState(null);

  useUIAction('select_unit', (unit) => {
    let nextState = {
      ...unit.serialize(),
      combatStats: unit.getCombatStats()
    }
    setUnit(nextState);
  })

  if (unit === null) return null;
  else return unit;
}

export default useSelectedUnit;