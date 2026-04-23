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

  return (
    <>
      <UnitSummary unit={unit} />
      <UnitDetailToggle unit={unit} />
      <InventoryQuickView />
    </>
  )
}

export default UnitSummaryContainer;