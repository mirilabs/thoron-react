import React from "react";
import useUnit, { useSelectedUnit } from "components/utils/useUnit";
import { useControllerSelector } from "components/utils/reduxHooks";
import CombatPreview from "./CombatPreviewContainer";
import CombatInput from "./CombatInput";
import { DeployedUnit } from "thoron";
import { CombatForecast } from "thoron/dist/Battle";

function CombatMenu() {
  const unit: DeployedUnit = useSelectedUnit();
  const {
    targetId,
    destination
  } = useControllerSelector(state => state.pendingMove);
  const target: DeployedUnit = useUnit(targetId);

  // rerender when equip index changes
  useControllerSelector(state => (
    state.pendingMove.itemIndex
  ));

  let forecast: CombatForecast;
  if (unit && target) {
    let range = target.getDistance(destination);
    forecast = unit?.getCombatForecast(target, range);
  }

  return (
    <>
      {
        forecast &&
        <CombatPreview attacker={unit} target={target} forecast={forecast} />
      }
      <CombatInput />
    </>
  )
}

export default CombatMenu;