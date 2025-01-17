import React from "react";
import CombatPreview, {
  ICombatPreview
} from "components/gameView/CombatMenu/CombatPreview";
import {
  ActionResult,
  DeployedUnit,
  ICombatForecastSide,
  ICombatResultSide
} from "thoron";
import CombatEvents from "./CombatEvents";

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

export default CombatLogDetail;