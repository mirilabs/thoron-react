import React, { useState } from "react";
import UnitDetail from "./UnitDetail";
import { DeployedUnit } from "thoron";
import UnitEditForm from "../UnitEdit/UnitEditForm";
import { Character } from "@/data/db";
import { useControllerDispatch } from "../../utils/reduxHooks";
import { unitSelected } from "@/shared/store";

function UnitDetailContainer({ unit }: { unit: DeployedUnit }) {
  const [editing, setEditing] = useState(false);

  const handleSave = (record: Character) => {
    unit.record = record;
    setEditing(false);
  }

  const dispatch = useControllerDispatch();
  const handleClose = () => {
    dispatch(unitSelected(null));
  }

  return editing ? (
    <UnitEditForm record={unit.record as Character}
      handleSave={handleSave}
      handleCancel={() => setEditing(false)} />
  ) : (
    <UnitDetail record={unit.record as Character}
      handleStartEdit={() => setEditing(true)}
      handleClose={handleClose} />
  );
}

export default UnitDetailContainer;