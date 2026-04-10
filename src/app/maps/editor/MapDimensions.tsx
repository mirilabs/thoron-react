import React from "react";
import NumberField from "@/app/gameplay/ControlPanel/UnitEdit/NumberField"

function MapDimensions({
  width,
  height,
  onWidthChange,
  onHeightChange
}: {
  width: number,
  height: number,
  onWidthChange: (value: number) => void,
  onHeightChange: (value: number) => void
}) {
  return (
    <div>
      <div className="flex flex-row gap-2">
        <NumberField
          name="width"
          label="Width"
          value={width}
          onChange={onWidthChange}
          min={1}
        />
        <NumberField
          name="height"
          label="Height"
          value={height}
          onChange={onHeightChange}
          min={1}
        />
      </div>
    </div>
  )
}

export default MapDimensions;