import React, { useState } from 'react';
import useControllerEventListener from './useControllerEvents';

function UnitPanel({ render }) {
  const [data, setData] = useState(null);

  useControllerEventListener('select_unit', unit => {
    setData(unit);
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