import "./Header.scss";
import React from "react";

function UnitPanelHeader({ unit }) {
  if (!unit) return null;

  const portrait = unit.record.sprite,
    name = unit.record.name ?? 'Unit',
    equipped = unit.items[unit.state.equippedIndex] ?? { name: '---' };

  return (
    <div className="unit-panel__header">
      <span className="unit-selector">
        <img className="sprite" src={portrait} alt={name} />
        <h1 className="name">{name}</h1>
      </span>
      <span className="weapon-selector">
        <h2 className="equipped">{equipped.name ?? '???'}</h2>
      </span>
    </div>
  );
}

export default UnitPanelHeader;