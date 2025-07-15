import React from "react";
import { TextField } from "@mui/material";
import { IUnitRecord } from "thoron";

interface ProfileFormProps {
  data: IUnitRecord;
  setData: (data: IUnitRecord) => void;
}

function ProfileForm({ data, setData }: ProfileFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <TextField required
        label="Name"
        name="name"
        value={data.name ?? ""}
        onChange={handleChange}
        sx={{ marginBottom: 1 }}
      />
    </div>
  )
}

export default ProfileForm;