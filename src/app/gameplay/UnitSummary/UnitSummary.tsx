import React from "react";
import "./UnitSummary.scss";
import CombatStats from "./CombatStats";
import { DeployedUnit } from "thoron";

function Renderer({ unit, ...props }: {
  unit: DeployedUnit,
  [key: string]: any
}) {
  if (!unit) return null;

  const level = unit.record.level ?? '?',
    exp = unit.record.exp ?? 0,
    hp = unit.state.hp ?? '?',
    maxHp = unit.record.stats.mhp ?? '?',
    movement = unit.record.movement ?? 0;

  return (
    <div className="unit-summary" {...props}>
      <span className="body-left">
        <div className="hp"><strong>HP</strong> {hp} / {maxHp}</div>
        <div className="unit-class">{unit.record.className}</div>
        <div className="level">
          <span><strong>Lv.</strong> {level}</span>
          <span className="exp-container">
            <meter className="exp" max={100} value={exp}></meter>
          </span>
          <span className="move"><strong>Mov</strong> {movement}</span>
        </div>
      </span>
      <div className="body-middle">
        <CombatStats unit={unit} />
      </div>
    </div>
  );
}

function UnitSummary({ unit }) {
  return <Renderer unit={unit} />
}

export default UnitSummary;