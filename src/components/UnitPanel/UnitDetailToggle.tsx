import { useUIEmitter } from "components/utils/useUIAction";
import "./UnitDetailToggle.scss";
import React from "react";

function UnitDetailToggle({ unit }) {
  const toggleDetail = useUIEmitter('toggle_character_detail_display');
    
  if (!unit) return null;
  else {
    const portrait = unit.record.sprite,
      name = unit.record.name ?? "?";
    
    return (
      <button className="unit-detail-toggle" onClick={() => toggleDetail()}>
        <img className="sprite" src={portrait} alt={name} />
        <h1 className="name">{name}</h1>
      </button>
    );
  }
}

export default UnitDetailToggle;