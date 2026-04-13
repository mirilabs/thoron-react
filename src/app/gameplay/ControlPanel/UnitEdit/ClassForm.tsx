import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Character } from "@/data/db";
import NumberField from "./NumberField";

interface ClassFormProps {
  data: Character;
  setData: (data: Character) => void;
}

interface ChangeEvent {
  target: {
    name: string;
    value: string;
  }
}

function ClassForm({ data, setData }: ClassFormProps) {
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <TextField
        label="Class"
        name="className"
        value={data.className ?? ""}
        onChange={handleChange}
        size="small" />

      <NumberField
        label="Movement"
        name="movement"
        value={data.movement}
        onChange={(value) => setData({ ...data, movement: value })}
        min={0}
        max={99}
      />

      <div className="mt-4">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Move Type</InputLabel>
          <Select
            name="moveType"
            value={data.moveType || ""}
            label="Move Type"
            onChange={handleChange}
          >
            <MenuItem value="infantry">Infantry</MenuItem>
            <MenuItem value="armor">Armor</MenuItem>
            <MenuItem value="cavalry">Cavalry</MenuItem>
            <MenuItem value="flying">Flying</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default ClassForm;