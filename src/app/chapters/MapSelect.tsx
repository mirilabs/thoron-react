import React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";

type MapMetadata = {
  id: number;
  name: string;
};

function MapSelect({ maps, mapIndex, setMapIndex }: {
  maps: MapMetadata[] | null,
  mapIndex: number,
  setMapIndex: (index: number) => void
}) {
  const handleChange = (e: any) => {
    setMapIndex(e.target.value);
  }

  if (!maps) return null;

  return (
    <div className="flex flex-col gap-2">
      <InputLabel htmlFor="map">Map</InputLabel>
      <Select
        name="map"
        value={mapIndex}
        onChange={handleChange}
      >
        {maps.map((map, index) => (
          <MenuItem key={map.id} value={index}>
            {map.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default React.memo(MapSelect);