import React, { useState } from "react";
import { DeployedUnit, IUnitRecord } from "thoron";
import { TextField } from "@mui/material";
import NumberField from "./NumberField";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO validate and emit
    console.log(formData);
    handleSave(formData);
  };

  return (
    <form className="unit-edit-form" onSubmit={handleSubmit}>
      <div>
        <TextField required
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-field"
          sx={{ marginBottom: 1 }}
        />
        <TextField
          label="Class"
          name="className"
          value={formData.className}
          onChange={handleChange}
          className="form-field"
          size="small"
          sx={{ marginBottom: 1 }}
        />
        <div>
          <NumberField
            label="Level"
            name="level"
            value={formData.level}
            onChange={(value) => setFormData({ ...formData, level: value })}
            min={1} max={40}
            required
            className="form-field" />
          <NumberField
            label="EXP"
            name="exp"
            value={formData.exp}
            onChange={(value) => setFormData({ ...formData, exp: value })}
            min={0} max={99}
            className="form-field" />
        </div>
      </div>
      {/* Add more fields as necessary */}
      <span>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </span>
    </form>
  );
}

export default UnitEditForm;
export type {
  UnitEditFormProps
}