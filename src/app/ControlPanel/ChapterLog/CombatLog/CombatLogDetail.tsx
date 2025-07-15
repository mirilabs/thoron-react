import "./CombatLogDetail.scss";
import React from "react";
import CombatPreview, {
  ICombatPreview
} from "@/app/gameView/ActionMenu/CombatMenu/CombatPreviewSide";
import {
  DeployedUnit,
  ICombatForecastSide,
  ICombatResultSide
} from "thoron";
import CombatEvents from "./CombatEvents";
import { LogDetailProps } from "../LogItem";

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

function CombatLogDetail({ unit, target, actionResult }: LogDetailProps) {
  let left = getForecastData(
    unit,
    actionResult.combatForecast.initiator,
    actionResult.combatResult.initiator
  );
  let right = getForecastData(
    target,
    actionResult.combatForecast.defender,
    actionResult.combatResult.defender
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
        events={actionResult.events}
        leftUnit={renderInitiatorOnLeft ? unit : target}
        rightUnit={renderInitiatorOnLeft ? target : unit}
        leftData={left}
        rightData={right} />
      <CombatPreview data={right} />
    </div>
  )
}

export default CombatLogDetail;