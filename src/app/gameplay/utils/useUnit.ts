import ThoronContext from "@/app/gameplay/ThoronContext";
import { useContext } from "react";
import { useControllerSelector } from "./reduxHooks";
import { DeployedUnit, ItemRecord, UnitId } from "thoron";

function useUnit(id: UnitId): DeployedUnit {
  const { chapter } = useContext(ThoronContext);
  if (id === null || id === undefined) return null;
  return chapter?.getUnitById(id) ?? null;
}

function useSelectedUnit(): DeployedUnit {
  const id = useControllerSelector(state => state.unitId);
  return useUnit(id);
}

function useSelectedTarget(): DeployedUnit {
  const id = useControllerSelector(state => state.pendingMove?.targetId);
  return useUnit(id);
}

function useSelectedItem(): ItemRecord {
  const unit = useSelectedUnit();
  const selectedItemIndex = useControllerSelector(
    state => state.pendingMove.itemIndex
  );
  return unit?.items?.[selectedItemIndex];
}

export default useUnit;
export { useSelectedUnit, useSelectedTarget, useSelectedItem }