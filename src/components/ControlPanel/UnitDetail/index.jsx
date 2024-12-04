import "./index.scss";
import React from "react";
import StatView from "./StatView";
import InventoryView from "./InventoryView";
import { useSelectedUnit } from "components/utils/useUnit";

function UnitDetail() {
  const selectedUnit = useSelectedUnit();

  if (!selectedUnit) return null;
  return (
    <div className="unit-detail">
      <div className="title">
        <h1>{selectedUnit.record.name}</h1>
      </div>
      <StatView stats={selectedUnit.record.stats}
          growths={selectedUnit.record.growths} />
      <InventoryView items={selectedUnit.record.items} />
    </div>
  )
}

export default UnitDetail;