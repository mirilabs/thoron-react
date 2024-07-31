import "./UnitPanelContainer.scss";
import React from 'react';
import UnitDetailToggle from "./UnitDetailToggle";
import UnitPanelBody from "./Body";
import useSelectedUnit from "components/utils/useSelectedUnit";
import WeaponSelector from "./WeaponSelector";

function UnitPanel() {
  const unit = useSelectedUnit();

  return (
    <div className="unit-panel">
      <UnitPanelBody unit={unit} />
      <UnitDetailToggle unit={unit} />
      <WeaponSelector unit={unit} />
    </div>
  )
}

export default UnitPanel;