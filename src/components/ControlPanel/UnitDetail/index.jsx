import "./index.scss";
import React from "react";
import StatView from "./StatView";
import InventoryView from "./InventoryView";

function UnitDetail({ unit }) {
  return (
    <div className="unit-detail">
      <div className="title">
        <h1>{unit.record.name}</h1>
      </div>
      <StatView stats={unit.record.stats}
          growths={unit.record.growths} />
      <InventoryView items={unit.record.items} />
    </div>
  )
}

export default UnitDetail;