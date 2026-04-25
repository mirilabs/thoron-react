import React from "react";
import { useSelectedTarget, useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import { useControllerSelector } from "@/app/gameplay/utils/reduxHooks";
import CombatPreviewStats from "./CombatPreviewStats";
import { DeployedUnit } from "thoron";
import type { ICombatForecast } from "thoron";

function CombatPreview() {
  const unit: DeployedUnit = useSelectedUnit();
  const target = useSelectedTarget()
  const destination = useControllerSelector(
    state => state.pendingMove.destination
  );

  // rerender when equip index changes
  useControllerSelector(state => (
    state.pendingMove.itemIndex
  ));

  let forecast: ICombatForecast;
  if (unit && target) {
    let range = target.getDistance(destination);
    forecast = unit?.getCombatForecast(target, range);
  }

  if (!forecast) return null;

  return (
    <CombatPreviewStats attacker={unit} target={target} forecast={forecast} />
  )
}

export default CombatPreview;