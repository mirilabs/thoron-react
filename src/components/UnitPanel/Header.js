import { useUIEmitter } from "components/utils/useUIAction";
import "./Header.scss";
import React from "react";

function UnitPanelHeader({ unit }) {
  const toggleDetail = useUIEmitter('toggle_character_detail_display');
    
  if (!unit) return null;
  else {
    const portrait = unit.record.sprite,
      name = unit.record.name ?? 'Unit',
      equipped = unit.items[unit.state.equippedIndex] ?? { name: '---' };
    
    return (
      <div className="unit-panel__header">
        <span className="unit-selector" onClick={toggleDetail}>
          <img className="sprite" src={portrait} alt={name} />
          <h1 className="name">{name}</h1>
        </span>
        <span className="weapon-selector">
          <h2 className="equipped">{equipped.name ?? '???'}</h2>
        </span>
      </div>
    );
  }
}

export default UnitPanelHeader;