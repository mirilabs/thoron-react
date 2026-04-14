import ThoronContext from "@/app/gameplay/ThoronContext";
import { useContext } from "react";
import { useControllerSelector } from "./reduxHooks";
import { UnitId } from "thoron";

function useUnit(id: UnitId) {
  const { chapter } = useContext(ThoronContext);
  if (id === null || id === undefined) return null;
  return chapter?.getUnitById(id) ?? null;
}

function useSelectedUnit() {
  const id = useControllerSelector(state => state.unitId);
  return useUnit(id);
}

function useSelectedTarget() {
  const id = useControllerSelector(state => state.pendingMove?.targetId);
  return useUnit(id);
}

export default useUnit;
export { useSelectedUnit, useSelectedTarget }