import ThoronContext from "@/app/gameplay/ThoronContext";
import { useContext } from "react";
import { useControllerSelector } from "./reduxHooks";

function useUnit(id) {
  const { chapter } = useContext(ThoronContext);
  return chapter?.getUnitById(id) ?? null;
}

function useSelectedUnit() {
  const id = useControllerSelector(state => state.unitId);
  return useUnit(id);
}

export default useUnit;
export { useSelectedUnit }