import React from "react";
import NumberField from "./NumberField";
import { Slider } from "@mui/material";
import { IUnitRecord } from "thoron";
import "./StatField.scss";
import useResponsive, { WindowSize } from "@/app/utils/useResponsive";

interface StatFieldProps {
  label: string;
  stat: string;
  data: IUnitRecord;
  setData: (data: IUnitRecord) => void;
}

function StatField({
  label,
  stat,
  data,
  setData
}: StatFieldProps) {
  const setStatValue = (stat: string, value: number) => {
    setData({
      ...data,
      stats: {
        ...data.stats,
        [stat]: value,
      },
    });
  };

  const { size } = useResponsive();
  const showSlider = size >= WindowSize.MEDIUM;

  return (
    <div className="stat-field">
      <NumberField
        label={label}
        name={stat}
        value={data.stats[stat]}
        onChange={(value) => setStatValue(stat, value)}
        min={0} max={99} step={1} />
      {
        showSlider &&
        <Slider
          name={stat}
          value={data.stats[stat]}
          onChange={(e, value) => setStatValue(stat, value as number)}
          min={1} max={60} step={1}
          valueLabelDisplay="auto"
          sx={{
            color: "var(--accent-color)",
            width: "100px",
            marginBottom: 1
            }} />
      }
    </div>
  );
}

export default StatField;