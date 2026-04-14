import React from "react";
import { ICombatForecast, DeployedUnit, ICombatForecastSide } from "thoron";
import CombatPreviewSide, { ICombatPreview } from "./CombatPreviewStatsSide";

function getForecastData(
  unit: DeployedUnit,
  forecast: ICombatForecastSide,
  oppForecast: ICombatForecastSide
): ICombatPreview {
  const hp = unit.getState().hp;

  return {
    unitName: unit.record.name,
    equippedItem: unit.items[unit.state.equippedIndex],
    maxHP: unit.getStats().mhp,
    startHP: hp,
    endHP: hp - oppForecast.projectedTotalDamage,
    ...(forecast as Required<ICombatForecastSide>)
  }
}

function CombatPreviewStats({ attacker, target, forecast }: {
  attacker: DeployedUnit,
  target: DeployedUnit,
  forecast: ICombatForecast
}) {
  const attData = getForecastData(
    attacker,
    forecast.initiator,
    forecast.defender
  );
  const tgtData = getForecastData(
    target,
    forecast.defender,
    forecast.initiator
  )

  return (
    <div className="flex flex-row justify-between">
      <CombatPreviewSide data={attData} />
      <CombatPreviewSide data={tgtData} />
    </div>
  )
}

export default CombatPreviewStats;