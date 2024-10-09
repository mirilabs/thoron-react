import "./UnitPanelContainer.scss";
import React, { useCallback, useEffect, useState } from 'react';
import UnitDetailToggle from "./UnitDetailToggle";
import UnitPanelBody from "./Body";
import { useSelectedUnit } from "components/utils/useUnit";
import WeaponSelector from "./WeaponSelector";

function UnitPanel() {
  const unit = useSelectedUnit();

  const createRecord = (unit) => {
    if (unit) return {
      ...unit.serialize(),
      combatStats: unit.getCombatStats()
    }
    else return null;
  }

  const [record, setRecord] = useState(createRecord(unit));

  const updateRecord = useCallback((unit) => {
    setRecord(createRecord(unit));
  }, []);

  useEffect(() => {
    updateRecord(unit);
  }, [unit, updateRecord]);

  return (
    <div className="unit-panel">
      <UnitPanelBody unit={record} />
      <UnitDetailToggle unit={record} />
      <WeaponSelector updateRecord={updateRecord} />
    </div>
  )
}

export default UnitPanel;