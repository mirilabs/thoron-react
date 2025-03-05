import "./UnitDetail.scss";
import React from "react";
import StatView from "./StatView";
import InventoryView from "./InventoryView";
import { useControllerDispatch } from "components/utils/reduxHooks";
import { unitSelected } from "shared/store";
import { Unit } from "thoron";
import ClassView from "./ClassView";
import LevelView from "./LevelView";

interface UnitDetailProps {
  unit: Unit,
  handleStartEdit: () => void;
}

function UnitDetail(props: UnitDetailProps) {
  const { unit, handleStartEdit } = props;
  const dispatch = useControllerDispatch();
  
  const {
    name,
    stats,
    growths,
    items
  } = unit.record;

  return (
    <div className="unit-detail">
      <div className="title">
        <h1 className="unit-name">{name}</h1>
        <span>
          <button className="edit"
            onClick={handleStartEdit}>
            <i className="fas fa-edit" />
          </button>
          <button className="back"
            onClick={() => dispatch(unitSelected(null))}>
            <i className="fas fa-reply" />
          </button>
        </span>
      </div>
      <div className="chara-class">
        <ClassView record={unit.record} />
      </div>
      <div className="level">
        <LevelView record={unit.record} />
      </div>
      <div className="inventory">
        <InventoryView items={items} />
      </div>
      <div className="stats">
        <StatView stats={stats}
            growths={growths} />
      </div>
    </div>
  )
}

export default UnitDetail;