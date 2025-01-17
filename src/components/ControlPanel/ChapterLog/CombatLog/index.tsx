import "./CombatLog.scss";
import React, { useState } from "react";
import {
  ActionResult,
  DeployedUnit,
  ICombatForecastSide,
  ICombatResultSide
} from "thoron";
import CombatEvents from "./CombatEvents";
import CombatPreview, {
  ICombatPreview
} from "components/gameView/CombatMenu/CombatPreview";

function CombatLog({ unit, target, result }: {
  unit: DeployedUnit,
  target: DeployedUnit,
  result: ActionResult
}) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => setShowDetail(!showDetail);

  return (
    <>
      <div className="combat-header" onClick={toggleDetail}>
        {unit.record.name} attacked {target.record.name}
      </div>
      {
        showDetail &&
        <CombatLogDetail unit={unit} target={target} result={result} />
      }
    </>
  )
}

function getForecastData(
  unit: DeployedUnit,
  forecast: ICombatForecastSide,
  result: ICombatResultSide
): ICombatPreview {
  return {
    ...forecast,
    unitName: unit.record.name,
    unitSpriteUrl: unit.record['sprite'],
    equippedItem: unit.items[unit.state.equippedIndex],
    maxHP: unit.getStats().mhp,
    startHP: result.startHP,
    endHP: result.endHP
  } as ICombatPreview;
}

function CombatLogDetail({ unit, target, result }: {
  unit: DeployedUnit,
  target: DeployedUnit,
  result: ActionResult
}) {
  let left = getForecastData(
    unit,
    result.combatForecast.initiator,
    result.combatResult.initiator
  );
  let right = getForecastData(
    target,
    result.combatForecast.defender,
    result.combatResult.defender
  );
  
  const renderInitiatorOnLeft = unit.getTeam() < target.getTeam();
  if (!renderInitiatorOnLeft) {
    // swap positions
    let temp = left;
    left = right;
    right = temp;
  }

  return (
    <div className="combat-detail">
      <CombatPreview data={left} />
      <CombatEvents
        events={result.events}
        leftUnit={renderInitiatorOnLeft ? unit : target}
        rightUnit={renderInitiatorOnLeft ? target : unit}
        leftData={left}
        rightData={right} />
      <CombatPreview data={right} />
    </div>
  )
}

export default CombatLog;