import React from "react";
import { Map } from "@/data/db";
import { Button, Checkbox, FormLabel, Tab, Tabs, TextField } from "@mui/material";
import MapDimensions from "./MapDimensions";
import TileList from "./TileList";
import { ITileRecord } from "thoron";

enum MapToolsTab {
  Info,
  Terrain,
  Background,
  View
}

const TILE_SIZE = 64;

function MapTools({
  map,
  onMapChange,
  onNameChange,
  onWidthChange,
  onHeightChange,
  showGrid,
  onShowGridChange,
  showTerrainLabels,
  onShowTerrainLabelsChange,
  selectedTileId,
  onTileSelect,
  onTileCreate,
  onTileUpdate,
  onTileDelete,
  paintMode,
  onPaintModeChange,
  onBackgroundChange
}: {
  map: Map,
  onMapChange: (map: Map) => void,
  onNameChange: (value: string) => void,
  onWidthChange: (value: number) => void,
  onHeightChange: (value: number) => void,
  showGrid: boolean,
  onShowGridChange: (show: boolean) => void,
  showTerrainLabels: boolean,
  onShowTerrainLabelsChange: (show: boolean) => void,
  selectedTileId: number,
  onTileSelect: (tileId: number) => void,
  onTileCreate: (tile: ITileRecord) => void,
  onTileUpdate: (tileId: number, tile: ITileRecord) => void,
  onTileDelete: (tileId: number) => void,
  paintMode: boolean,
  onPaintModeChange: (paint: boolean) => void,
  onBackgroundChange: (background: HTMLImageElement | null) => void
}) {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
    onPaintModeChange(value === MapToolsTab.Terrain);
  }

  const width = map.map[0].length;
  const height = map.map.length;

  type UploadEvent = React.ChangeEvent<HTMLInputElement>;
  const handleBackgroundChange = (event: UploadEvent) => {
    const file = event.target.files?.[0];
    if (file) {
      onMapChange({
        ...map,
        background: file
      });

      const image = new Image();
      image.onload = () => {
        onBackgroundChange(image);
      }
      image.src = URL.createObjectURL(file);
    }
  }

  return (
    <div className={
      "border border-[var(--text-color-2)]/20 rounded-lg"
    }>
      <Tabs
        value={tab}
        onChange={handleTabChange}
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
          icon={<i className="fas fa-image" />}
          label="Background"
        />
        <Tab
          icon={<i className="fas fa-eye" />}
          label="View"
        />
      </Tabs>
      <div className="p-4">
        {tab === MapToolsTab.Info && (
          <div className="flex flex-col gap-2">
            <TextField
              label="Name"
              value={map.name}
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
        {tab === MapToolsTab.Terrain && (
          <div>
            <FormLabel className="flex flex-row items-center gap-2">
              <Checkbox
                checked={paintMode}
                onChange={(event) => onPaintModeChange(event.target.checked)}
              />
              Painting
            </FormLabel>
            <TileList
              tiles={map.tiles}
              selectedTileId={selectedTileId}
              onTileSelect={onTileSelect}
              onTileCreate={onTileCreate}
              onTileUpdate={onTileUpdate}
              onTileDelete={onTileDelete}
            />
          </div>
        )}
        {tab === MapToolsTab.Background && (
          <div className="flex flex-col gap-2">
            <Button
              variant="outlined"
              component="label"
              startIcon={<i className="fas fa-upload" />}
            >
              Upload Background
              {` (${width * TILE_SIZE} x ${height * TILE_SIZE})`}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleBackgroundChange}
              />
            </Button>
            {map.background && (
              <div className="text-sm text-[var(--text-color-2)]">
                {(map.background as File).name || "Custom background"} uploaded
              </div>
            )}
          </div>
        )}
        {tab === MapToolsTab.View && (
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
                checked={showTerrainLabels}
                onChange={
                  (event) => onShowTerrainLabelsChange(event.target.checked)
                }
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