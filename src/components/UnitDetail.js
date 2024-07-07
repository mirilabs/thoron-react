import React from 'react';
import useSelectedUnit from './utils/useSelectedUnit';

function UnitDetail({ render }) {
  const selectedUnit = useSelectedUnit();
  const data = selectedUnit ? selectedUnit.serialize() : {};

  if (render) {
    return render(data);
  }
  else {
    return (
      <div className="unit-data">
        {JSON.stringify(data)}
      </div>
    )
  }
}

export default UnitDetail;