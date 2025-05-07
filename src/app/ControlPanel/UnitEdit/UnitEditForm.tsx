import React, { useState } from "react";
import { DeployedUnit, IUnitRecord } from "thoron";
import ProfileForm from "./ProfileForm";
import StatsForm from "./StatsForm";
import "./UnitEditForm.scss";
import { Button } from "@mui/material";

interface UnitEditFormProps {
  unit: DeployedUnit;
  handleSave: (record: IUnitRecord) => void;
  handleCancel: () => void;
}

function UnitEditForm({
  unit,
  handleSave,
  handleCancel
}: UnitEditFormProps) {
  const { record, state } = unit.serialize();
  const [formData, setFormData] = useState(record);

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabClick = (index: number) => {
    // create callback
    return (event: React.SyntheticEvent) => {
      event.preventDefault(); // preventDefault so it doesn't submit the form
      setTabIndex(index);     // set state
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO validate and emit
    console.log(formData);
    handleSave(formData);
  };

  // select which part of the form to render based on currently selected tab
  let content: React.JSX.Element;
  switch(tabIndex) {
    case 0:
      content = (<ProfileForm data={formData} setData={setFormData} />);
      break;
    case 1:
      content = (<StatsForm data={formData} setData={setFormData} />);
      break;
    case 2:
      content = (<>TBI</>);
      break;
    default:
      throw new Error("UnitEditForm: Invalid tabIndex")
  }

  return (
    <form className="unit-edit-form" onSubmit={handleSubmit}>
      <div className="unit-edit-form__tabs">
        <Button onClick={handleTabClick(0)}>PROFILE</Button>
        <Button onClick={handleTabClick(1)}>STATS</Button>
        <Button onClick={handleTabClick(2)}>ITEMS</Button>
      </div>
      <div className="unit-edit-form__content">
        {content}
      </div>
      <div className="unit-edit-form__footer">
        <Button variant="contained" type="submit">Save</Button>
        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default UnitEditForm;
export type {
  UnitEditFormProps
}