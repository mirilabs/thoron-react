import React from "react";
import { Map } from "@/data/db";
import { Checkbox, FormLabel, Tab, Tabs, TextField } from "@mui/material";
import MapDimensions from "./MapDimensions";
import TileList from "../TileList";

function MapTools({
  map,
  name,
  onNameChange,
  width,
  onWidthChange,
  height,
  onHeightChange,
  showGrid,
  onShowGridChange,
  showTerrain,
  onShowTerrainChange
}: {
  map: Map,
  name: string,
  onNameChange: (value: string) => void,
  width: number,
  onWidthChange: (value: number) => void,
  height: number,
  onHeightChange: (value: number) => void,
  showGrid: boolean,
  onShowGridChange: (show: boolean) => void,
  showTerrain: boolean,
  onShowTerrainChange: (show: boolean) => void
}) {
  const [tab, setTab] = React.useState(0);

  return (
    <div className={
      "border border-[var(--text-color-2)]/20 rounded-lg p-4"
    }>
      <Tabs
        value={tab}
        onChange={(event, value) => setTab(value)}
        aria-label="Map tools"
        variant="fullWidth"
      >
        <Tab
          icon={<i className="fas fa-cog" />}
          label="Info"
        />
        <Tab
          icon={<i className="fas fa-mountain" />}
          label="Terrain"
        />
        <Tab
          icon={<i className="fas fa-eye" />}
          label="View"
        />
      </Tabs>
      <div>
        {tab === 0 && (
          <div className="flex flex-col gap-2 pt-4 pb-2">
            <TextField
              label="Name"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
            />
            <MapDimensions
              width={width}
              height={height}
              onWidthChange={onWidthChange}
              onHeightChange={onHeightChange}
            />
          </div>
        )}
        {tab === 1 && (
          <div>
            <TileList tiles={map.tiles || []} />
          </div>
        )}
        {tab === 2 && (
          <div>
            <FormLabel className="flex flex-row items-center gap-2">
              <Checkbox
                checked={showGrid}
                onChange={(event) => onShowGridChange(event.target.checked)}
              />
              Show grid
            </FormLabel>
            <FormLabel className="flex flex-row items-center gap-2">
              <Checkbox
                checked={showTerrain}
                onChange={(event) => onShowTerrainChange(event.target.checked)}
              />
              Show terrain labels
            </FormLabel>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapTools;