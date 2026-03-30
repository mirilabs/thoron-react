import React from "react";
import { FormLabel, TextField } from "@mui/material";
import { Character } from "@/data/db";

interface ProfileFormProps {
  data: Character;
  setData: (data: Character) => void;
}

function ImageInput({
  label,
  name,
  url,
  width,
  height,
  onChange
}: {
  label: string;
  name: string;
  url: string | undefined;
  width: number;
  height: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const imageClassName = (
    "border border-[var(--accent-color)] rounded-lg " +
    "bg-[var(--bg-color)] hover:bg-[var(--bg-color-2)] " +
    "cursor-pointer color-[var(--text-color)]"
  )

  const image = url ? (
    <img src={url} className={imageClassName}
      alt={label} width={width} height={height} />
  ) : (
    <div className={`${imageClassName} flex items-center justify-center`}
      style={{ width, height }}>
      <i className="fas fa-image" />
    </div>
  )

  return (
    <div className="bg-[var(--bg-color-2)] rounded-lg p-4">
      <FormLabel className="flex flex-col items-center gap-2">
        <h2 className="font-bold">{label}</h2>
        {image}
        <input type="file" accept="image/*" hidden
          name={name} onChange={onChange} />
      </FormLabel>
    </div>
  )
}

function ProfileForm({ data, setData }: ProfileFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const file = event.target.files?.[0];

    if (!file) return;
    setData({
      ...data,
      [name]: file
    });
  };

  const portraitUrl = data.portrait ?
    URL.createObjectURL(data.portrait) : undefined;
  const mapSpriteUrl = data.mapSprite ?
    URL.createObjectURL(data.mapSprite) : undefined;

  return (
    <div>
      <TextField required
        label="Name"
        name="name"
        value={data.name ?? ""}
        onChange={handleChange}
        sx={{ marginBottom: 1 }}
      />
      <div className="flex flex-row gap-2 items-start">
        <ImageInput label="Portrait" name="portrait" url={portraitUrl}
          width={128} height={128}
          onChange={handleFileChange} />
        <ImageInput label="Map Sprite" name="mapSprite" url={mapSpriteUrl}
          width={64} height={64}
          onChange={handleFileChange} />
      </div>
    </div>
  )
}

export default ProfileForm;