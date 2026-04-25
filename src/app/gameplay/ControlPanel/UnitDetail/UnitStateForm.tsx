import React, { useState } from "react";
import { DeployedUnit } from "thoron";
import NumberField from "../UnitEdit/NumberField";
import { Slider } from "@mui/material";

interface UnitStateFormProps {
  unit: DeployedUnit;
}

function UnitStateForm({ unit }: UnitStateFormProps) {
  const [hp, setHp] = useState(unit.state.hp);
  const maxHp = unit.record.stats.mhp;

  const handleHpChange = (value: number) => {
    setHp(value);
    unit.setState({ hp: value });
  };

  return (
    <div className="unit-state-form p-4 bg-[var(--bg-color)] rounded-md mb-4">
      <h3 className="text-lg font-bold mb-2">Unit State</h3>
      <div className="flex flex-row items-center">
        <NumberField
          label="Current HP"
          name="hp"
          value={hp}
          onChange={handleHpChange}
          min={1}
          max={maxHp}
        />
        <Slider
          value={hp}
          onChange={(_, value) => handleHpChange(value as number)}
          min={1}
          max={maxHp}
          valueLabelDisplay="auto"
          aria-labelledby="hp"
          sx={{
            margin: "8px",
          }}
        />
      </div>
    </div>
  );
}

export default UnitStateForm;
