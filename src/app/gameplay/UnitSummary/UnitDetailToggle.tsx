import { useUIEmitter } from "@/app/gameplay/utils/useUIAction";
import "./UnitDetailToggle.scss";
import React from "react";
import { Character } from "@/data/db";
import { DeployedUnit } from "thoron";

function UnitDetailToggle({ unit }: { unit: DeployedUnit }) {
  const toggleDetail = useUIEmitter('open_character_detail');

  if (!unit) return null;
  else {
    const portraitUrl =
      URL.createObjectURL((unit.record as Character).portrait);
    const name = unit.record.name ?? "?";

    return (
      <button className="unit-detail-toggle" onClick={toggleDetail}>
        <img className="sprite max-w-8 aspect-square"
          src={portraitUrl}
          alt={name} />
        <h1 className="name">{name}</h1>
      </button>
    );
  }
}

export default UnitDetailToggle;