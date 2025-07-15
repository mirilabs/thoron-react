import React, { useState } from "react";
import UnitDetail from "./UnitDetail";
import { DeployedUnit } from "thoron";
import UnitEditForm from "../UnitEdit/UnitEditForm";

function UnitDetailContainer({ unit }: { unit: DeployedUnit }) {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <UnitEditForm unit={unit}
      handleSave={() => setEditing(false)}
      handleCancel={() => setEditing(false)} />
  ) : (
    <UnitDetail unit={unit} handleStartEdit={() => setEditing(true)} />
  );
}

export default UnitDetailContainer;