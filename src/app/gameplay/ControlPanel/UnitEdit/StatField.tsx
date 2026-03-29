import React from "react";
import NumberField from "./NumberField";
import { Slider } from "@mui/material";
import { IUnitRecord } from "thoron";
import "./StatField.scss";
import useResponsive, { WindowSize } from "@/app/gameplay/utils/useResponsive";

interface StatFieldProps {
  label?: string;
  stat: string;
  data: IUnitRecord;
  setData: (data: IUnitRecord) => void;
}

function shouldShowSlider(windowSize: number): boolean {
  return windowSize >= WindowSize.MEDIUM;
}

function StatField({
  label,
  stat,
  data,
  setData
}: StatFieldProps) {
  const setStatValue = (value: number) => {
    setData({
      ...data,
      stats: {
        ...data.stats,
        [stat]: value,
      },
    });
  };

  const { size } = useResponsive();
  const showSlider = shouldShowSlider(size);

  return (
    <div className="stat-field">
      {/* stat value */}
      <NumberField
        label={label}
        name={stat}
        value={data.stats[stat]}
        onChange={(value) => setStatValue(value)}
        min={0} max={99} step={1} />
      {
        showSlider &&
        <Slider
          name={stat}
          value={data.stats[stat]}
          onChange={(e, value) => setStatValue(value as number)}
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

function GrowthField({
  label,
  stat,
  data,
  setData
}: StatFieldProps) {
  const setGrowthValue = (value: number) => {
    setData({
      ...data,
      growths: {
        ...data.growths,
        [stat]: value
      }
    })
  }
  
  const { size } = useResponsive();
  const showSlider = shouldShowSlider(size);

  return (
    <div className="stat-field growth">
      <NumberField
        label={label}
        name={stat + "_growth"}
        value={data.growths[stat]}
        onChange={(value) => setGrowthValue(value)}
        min={0} max={999} step={1}
         />
      {
        showSlider &&
        <Slider
          name={stat + "_growth"}
          value={data.growths[stat]}
          onChange={(e, value) => setGrowthValue(value as number)}
          min={0} max={100} step={5}
          valueLabelDisplay="auto"
          sx={{
            color: "var(--accent-color-2)",
            width: "100px",
            marginBottom: 1
            }} />
      }
    </div>
  )
}

export default StatField;
export { GrowthField, StatFieldProps }