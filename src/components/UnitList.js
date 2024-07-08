import React, { useState, useContext, useEffect } from 'react';
import ThoronContext from './ThoronContext';
import useEventListener from './utils/useEventListener';
import useSelectedUnit from './utils/useSelectedUnit';

function UnitList({ render }) {
  const { chapter, uiEvents } = useContext(ThoronContext);

  const [units, setUnits] = useState(null);
  useEffect(() => {
    setUnits(chapter.getUnits().map(unit => unit.serialize()));
  }, [ chapter ]);
  
  const selectedUnit = useSelectedUnit();

  const data = {
    units,
    selectedUnit
  }

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

export default UnitList;