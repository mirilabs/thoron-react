import React from 'react';
import UnitDetailToggle from "./UnitDetailToggle";
import UnitSummary from "./UnitSummary";
import { useSelectedUnit } from "@/app/utils/useUnit";
import WeaponSelector from "./WeaponSelector";
import { useControllerSelector } from "@/app/utils/reduxHooks";

function UnitSummaryContainer() {
  const unit = useSelectedUnit();

  // rerender when equip index changes
  useControllerSelector(state => (
    state.pendingMove.itemIndex
  ));

  if (!unit) return (<></>);

  const record = {
    ...unit.serialize(),
    combatStats: unit.getCombatStats()
  }

  return (
    <>
      <UnitSummary unit={record} />
      <UnitDetailToggle unit={record} />
      <WeaponSelector />
    </>
  )
}

export default UnitSummaryContainer;