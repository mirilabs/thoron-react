import React from "react";
import { TextField } from "@mui/material";
import { Character } from "@/data/db";

interface ClassFormProps {
  data: Character;
  setData: (data: Character) => void;
}

function ClassForm({ data, setData }: ClassFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <TextField
        label="Class"
        name="className"
        value={data.className ?? ""}
        onChange={handleChange}
        size="small"
        sx={{ marginBottom: 1 }} />
    </div>
  )
}

export default ClassForm;