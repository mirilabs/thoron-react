import React from "react";
import NumberField from "./NumberField";
import { Slider } from "@mui/material";
import { IUnitRecord } from "thoron";
import "./StatField.scss";

interface StatFieldProps {
  label: string;
  stat: string;
  formData: IUnitRecord;
  setFormData: (data: IUnitRecord) => void;
}

function StatField({
  label,
  stat,
  formData,
  setFormData
}: StatFieldProps) {
  const setStatValue = (stat: string, value: number) => {
    setFormData({
      ...formData,
      stats: {
        ...formData.stats,
        [stat]: value,
      },
    });
  };

  return (
    <div className="stat-field">
      <NumberField
        label={label}
        name={stat}
        value={formData.stats[stat]}
        onChange={(value) => setStatValue(stat, value)}
        min={0} max={99} step={1} />
      <Slider
        name={stat}
        value={formData.stats[stat]}
        onChange={(e, value) => setStatValue(stat, value as number)}
        min={1} max={60} step={1}
        valueLabelDisplay="auto"
        sx={{
          color: "var(--accent-color)",
          width: "100px",
          marginBottom: 1
          }} />
    </div>
  );
}

export default StatField;