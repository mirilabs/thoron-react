import React, { useEffect, useState } from "react";
import { Unit, ValidationError } from "thoron";
import ProfileForm from "./ProfileForm";
import StatsForm from "./StatsForm";
import "./UnitEditForm.scss";
import { Button } from "@mui/material";
import ClassForm from "./ClassForm";
import { Character } from "@/data/db";
import ItemsForm from "./ItemsForm";

interface UnitEditFormProps {
  record: Character;
  handleSave: (record: Character) => void;
  handleCancel: () => void;
}

function UnitEditForm({
  record,
  handleSave,
  handleCancel
}: UnitEditFormProps) {
  const [formData, setFormData] = useState(record);

  // when record prop is updated, reset form data
  useEffect(() => {
    setFormData(record);
  }, [record]);

  const [errorMsg, setErrorMsg] = useState(null);

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

    // validate data
    try {
      const unit = new Unit(formData);
      handleSave(formData);
    }
    catch (e) {
      if (e instanceof ValidationError) {
        setErrorMsg(e.message);
      }
    }
  };

  // select which part of the form to render based on currently selected tab
  let content: React.JSX.Element;
  switch (tabId) {
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
      content = (<ItemsForm data={formData} setData={setFormData} />);
      break;
    default:
      throw new Error("UnitEditForm: Invalid tabIndex")
  }

  return (
    <form className="unit-edit-form" onSubmit={handleSubmit}>
      <div className="unit-edit-form__title">
        <span className="ml-auto">
          <Button variant="contained" type="submit">
            <i className="fas fa-save" />
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            <i className="fas fa-trash" />
          </Button>
        </span>
      </div>
      {
        errorMsg ??
        <div className="unit-edit-form__error">{errorMsg}</div>
      }
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