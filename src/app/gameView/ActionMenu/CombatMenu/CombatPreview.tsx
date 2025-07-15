import React from "react";
import { ICombatForecast, DeployedUnit, ICombatForecastSide } from "thoron";
import CombatPreviewSide, { ICombatPreview } from "./CombatPreviewSide";

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

function CombatPreviewContainer({ attacker, target, forecast }: {
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
    <div className="combat-preview">
      <span className="combat-preview__left">
        <CombatPreviewSide data={attData} />
      </span>
      <span className="combat-preview__center">

      </span>
      <span className="combat-preview__right">
        <CombatPreviewSide data={tgtData} />
      </span>
    </div>
  )
}

export default CombatPreviewContainer;