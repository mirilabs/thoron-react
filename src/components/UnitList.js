import React, { useState, useContext, useEffect } from 'react';
import { ThoronContext } from './ThoronContext';
import useEventListener from './useEventListener';

function UnitList({ render }) {
  const { chapter, uiEvents } = useContext(ThoronContext);

  const [units, setUnits] = useState(null);
  useEffect(() => {
    setUnits(chapter.getUnits().map(unit => unit.serialize()));
  }, []);
  
  const [selected, setSelected] = useState(null);
  useEventListener(uiEvents, 'select_unit', unit => {
    setSelected(unit.id);
  });

  const data = {
    units,
    selected
  }

  if (render !== undefined) {
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