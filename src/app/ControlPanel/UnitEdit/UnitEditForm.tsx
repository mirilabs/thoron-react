import React, { useState } from "react";
import { DeployedUnit, IUnitRecord } from "thoron";
import ProfileForm from "./ProfileForm";
import StatsForm from "./StatsForm";
import "./UnitEditForm.scss";
import { Button } from "@mui/material";
import ClassForm from "./ClassForm";

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

  const [tabId, setTabId] = useState("profile");
  const handleTabClick = (tabId: string) => {
    // create callback
    return (event: React.SyntheticEvent) => {
      event.preventDefault(); // preventDefault so it doesn't submit the form
      setTabId(tabId);     // set state
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
  switch(tabId) {
    case "profile":
      content = (<ProfileForm data={formData} setData={setFormData} />);
      break;
    case "class":
      content = (<ClassForm data={formData} setData={setFormData} />)
      break;
    case "stats":
      content = (<StatsForm data={formData} setData={setFormData} />);
      break;
    case "items":
      content = (<>TBI</>);
      break;
    default:
      throw new Error("UnitEditForm: Invalid tabIndex")
  }

  return (
    <form className="unit-edit-form" onSubmit={handleSubmit}>
      <div className="unit-edit-form__title">
        <h3>Editing {formData.name}</h3>
        <span>
          <Button variant="contained" type="submit">
            <i className="fas fa-save" />
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            <i className="fas fa-trash" />
          </Button>
        </span>
      </div>
      <div className="unit-edit-form__tabs">
        <Button onClick={handleTabClick("profile")}>PROFILE</Button>
        <Button onClick={handleTabClick("class")}>CLASS</Button>
        <Button onClick={handleTabClick("stats")}>STATS</Button>
        <Button onClick={handleTabClick("items")}>ITEMS</Button>
      </div>
      <div className="unit-edit-form__content">
        {content}
      </div>
      <div className="unit-edit-form__footer">
        <Button variant="contained" type="submit"
          startIcon={<i className="fas fa-save" />}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}
          startIcon={<i className="fas fa-trash" />}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default UnitEditForm;
export type {
  UnitEditFormProps
}