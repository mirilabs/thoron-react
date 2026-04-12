import React from "react";
import { useControllerDispatch } from "@/app/gameplay/utils/reduxHooks";
import { unitSelected } from "@/shared/store";
import HPBar from "./HPBar";
import { DeployedUnit } from "thoron";
import { Character } from "@/data/db";

function UnitTile({ unit }: { unit: DeployedUnit }) {
  const dispatch = useControllerDispatch();
  const handleClick = () => dispatch(unitSelected(unit.id))
  const maxHp = unit.record.stats.mhp;
  const hp = unit.state.hp;
  const team = unit.getTeam();

  return (
    <button className={`unit-tile team-${team}`} onClick={handleClick}>
      <img className="portrait"
        src={URL.createObjectURL((unit.record as Character).portrait)}
        alt={unit.record.name + " portrait"} />
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