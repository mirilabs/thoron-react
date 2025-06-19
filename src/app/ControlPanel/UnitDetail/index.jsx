import "./index.scss";
import React from "react";
import StatView from "./StatView";
import InventoryView from "./Items/Inventory";
import { useControllerDispatch } from "@/app/utils/reduxHooks";
import { unitSelected } from "@/shared/store";

function UnitDetail({ unit }) {
  const dispatch = useControllerDispatch();

  return (
    <div className="unit-detail">
      <div className="title">
        <h1>{unit.record.name}</h1>
        <button className="back"
          onClick={() => dispatch(unitSelected(null))}>
          <i className="fas fa-reply" />
        </button>
      </div>
      <StatView stats={unit.record.stats}
          growths={unit.record.growths} />
      <InventoryView items={unit.record.items} />
    </div>
  )
}

export default UnitDetail;