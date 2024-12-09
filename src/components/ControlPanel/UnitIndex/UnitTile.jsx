import { useControllerDispatch } from "components/utils/reduxHooks";
import React from "react";
import { unitSelected } from "shared/store";

function UnitTile({ unit }) {
  const dispatch = useControllerDispatch();
  const handleClick = () => dispatch(unitSelected(unit.id))

  return (
    <button className="unit-tile" onClick={handleClick}>
      <img className="sprite"
        src={unit.record.sprite}
        alt={unit.record.name + " sprite"} />
      {unit.record.name}
    </button>
  )
}

export default UnitTile;