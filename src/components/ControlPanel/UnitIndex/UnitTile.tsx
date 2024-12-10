import React from "react";
import { useControllerDispatch } from "components/utils/reduxHooks";
import { unitSelected } from "shared/store";
import HPBar from "./HPBar";

function UnitTile({ unit }) {
  const dispatch = useControllerDispatch();
  const handleClick = () => dispatch(unitSelected(unit.id))
  const maxHp = unit.record.stats.mhp;
  const hp = unit.state.hp;

  return (
    <button className="unit-tile" onClick={handleClick}>
      <img className="sprite"
        src={unit.record.sprite}
        alt={unit.record.name + " sprite"} />
      <span className="name">
        {unit.record.name}
      </span>
      <span className="hp-bar-container">
        <HPBar maxHP={maxHp} hp={hp} damage={0} widthScale="2px" />
      </span>
      <span className="hp-value">
        {hp} / {maxHp}
      </span>
    </button>
  )
}

export default UnitTile;