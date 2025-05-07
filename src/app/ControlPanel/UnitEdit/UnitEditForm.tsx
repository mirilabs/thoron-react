import React, { useState } from "react";
import { DeployedUnit, IUnitRecord } from "thoron";
import { TextField } from "@mui/material";
import NumberField from "./NumberField";
import StatField from "./StatField";

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
          value={formData.name ?? ""}
          onChange={handleChange}
          sx={{ marginBottom: 1 }}
        />
        <TextField
          label="Class"
          name="className"
          value={formData.className ?? ""}
          onChange={handleChange}
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
            required />
          <NumberField
            label="EXP"
            name="exp"
            value={formData.exp}
            onChange={(value) => setFormData({ ...formData, exp: value })}
            min={0} max={99} step={1} />
        </div>
        <StatField label="Max HP" stat="mhp"
          formData={formData} setFormData={setFormData} />
        <StatField label="Strength" stat="str"
          formData={formData} setFormData={setFormData} />
        <StatField label="Magic" stat="mag"
          formData={formData} setFormData={setFormData} />
        <StatField label="Skill" stat="skl"
          formData={formData} setFormData={setFormData} />
        <StatField label="Speed" stat="spd"
          formData={formData} setFormData={setFormData} />
        <StatField label="Luck" stat="luk"
          formData={formData} setFormData={setFormData} />
        <StatField label="Defense" stat="def"
          formData={formData} setFormData={setFormData} />
        <StatField label="Resistance" stat="res"
          formData={formData} setFormData={setFormData} />
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