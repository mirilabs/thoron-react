import React, { useState, useContext } from 'react';
import ThoronContext from './ThoronContext';
import useEventListener from './useEventListener';

function UnitPanel({ render }) {
  const { uiEvents } = useContext(ThoronContext);
  const [data, setData] = useState(null);

  useEventListener(uiEvents, 'select_unit', unit => {
    if (unit)
      setData(unit.serialize());
    else
      setData({});
  });

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

export default UnitPanel;