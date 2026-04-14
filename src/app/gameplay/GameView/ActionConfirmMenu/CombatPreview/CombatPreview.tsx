import React from "react";
import { useSelectedTarget, useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import { useControllerSelector } from "@/app/gameplay/utils/reduxHooks";
import CombatPreview from "./CombatPreviewStats";
import { DeployedUnit } from "thoron";
import type { ICombatForecast } from "thoron";

function CombatMenu() {
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
    <CombatPreview attacker={unit} target={target} forecast={forecast} />
  )
}

export default CombatMenu;