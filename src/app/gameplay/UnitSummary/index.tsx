import React from 'react';
import UnitDetailToggle from "./UnitDetailToggle";
import UnitSummary from "./UnitSummary";
import { useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import InventoryQuickView from "./InventoryQuickView";

function UnitSummaryContainer() {
  const unit = useSelectedUnit();

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