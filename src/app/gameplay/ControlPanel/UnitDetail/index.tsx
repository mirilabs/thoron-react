import React, { useState } from "react";
import UnitDetail from "./UnitDetail";
import { DeployedUnit } from "thoron";
import UnitEditForm from "../UnitEdit/UnitEditForm";
import { IUnitRecord } from "thoron";

function UnitDetailContainer({ unit }: { unit: DeployedUnit }) {
  const [editing, setEditing] = useState(false);

  const handleSave = (record: IUnitRecord) => {
    unit.record = record;
    setEditing(false);
  }

  return editing ? (
    <UnitEditForm record={unit.record}
      handleSave={handleSave}
      handleCancel={() => setEditing(false)} />
  ) : (
    <UnitDetail unit={unit} handleStartEdit={() => setEditing(true)} />
  );
}

export default UnitDetailContainer;