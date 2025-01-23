import React from "react";
import { ICombatForecast, DeployedUnit, ICombatForecastSide } from "thoron";
import CombatPreview, { ICombatPreview } from "./CombatPreview";

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
    <div className="attack-preview">
      <span className="attack-preview__left">
        <CombatPreview data={attData} />
      </span>
      <span className="attack-preview__center">

      </span>
      <span className="attack-preview__right">
        <CombatPreview data={tgtData} />
      </span>
    </div>
  )
}

export default CombatPreviewContainer;