import ThoronContext from "components/ThoronContext";
import { useContext, useCallback, useState, useEffect } from "react";
import { useControllerSelector } from "./reduxHooks";

function useUnit(id) {
  const { chapter } = useContext(ThoronContext);
  return chapter.getUnitById(id);
}

function useSelectedUnit() {
  const id = useControllerSelector(state => state.unitId);
  return useUnit(id);
}

function useSelectedUnitRecord() {
  const unit = useSelectedUnit();

  const getState = useCallback(unit => {
    if (unit) return {
      ...unit.serialize(),
      combatStats: unit.getCombatStats()
    }
    else return null;
  }, []);

  const [record, setRecord] = useState(getState(unit));

  const update = useCallback((unit) => {
    setRecord(getState(unit));
  }, [getState]);

  useEffect(() => {
    update(unit)
  }, [unit, update]);

  return {
    record,
    update
  }
}

export default useUnit;
export { useSelectedUnit, useSelectedUnitRecord }