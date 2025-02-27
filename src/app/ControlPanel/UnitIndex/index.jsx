import ThoronContext from "@/app/ThoronContext";
import { useSelectedUnit } from "@/app/utils/useUnit";
import React, { useContext } from "react";
import UnitDetail from "../UnitDetail";
import UnitTile from "./UnitTile";

function UnitIndexContainer() {
  const selectedUnit = useSelectedUnit();

  if (selectedUnit) {
    return <UnitDetail unit={selectedUnit} />
  }
  else {
    return <UnitIndex />
  }
}

function UnitIndex() {
  const { chapter } = useContext(ThoronContext);
  const units = chapter?.getUnits() ?? [];
  units.sort((unit1, unit2) => unit1.getTeam() > unit2.getTeam());

  const tiles = units.map(unit => (
    <UnitTile key={unit.id} unit={unit} />
  ));

  return (
    <>
      {tiles}
    </>
  )

}

export default UnitIndexContainer;