import React from 'react';
import UnitDetailToggle from "./UnitDetailToggle";
import UnitSummary from "./UnitSummary";
import { useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import InventoryQuickView from "./InventoryQuickView";
import { useControllerSelector } from "@/app/gameplay/utils/reduxHooks";

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
      <InventoryQuickView />
    </>
  )
}

export default UnitSummaryContainer;