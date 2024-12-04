import React from 'react';
import UnitDetailToggle from "./UnitDetailToggle";
import UnitSummary from "./UnitSummary";
import { useSelectedUnitRecord } from "components/utils/useUnit";
import WeaponSelector from "./WeaponSelector";

function UnitSummaryContainer() {
  const { record, update } = useSelectedUnitRecord();

  return (
    <>
      <UnitSummary unit={record} />
      <UnitDetailToggle unit={record} />
      <WeaponSelector updateRecord={update} />
    </>
  )
}

export default UnitSummaryContainer;