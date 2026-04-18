import NumberField from "@/app/gameplay/ControlPanel/UnitEdit/NumberField";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import React from "react";
import { ITileRecord } from "thoron";

const BLANK_TILE: ITileRecord = {
  name: "New tile",
  cost: {
    default: 1,
    infantry: 1,
    cavalry: 1,
    armor: 1,
    flying: 1
  },
  stats: {
    avd: 0,
    def: 0,
    res: 0
  }
};

function TileEdit({
  tile = BLANK_TILE,
  onSave,
  onCancel
}: {
  tile?: ITileRecord,
  onSave: (tile: ITileRecord) => void,
  onCancel: () => void
}) {
  const [name, setName] = React.useState(tile.name);
  const [cost, setCost] = React.useState({
    default: tile.cost.default || 1,
    infantry: tile.cost.infantry || tile.cost.default || 1,
    cavalry: tile.cost.cavalry || tile.cost.default || 1,
    armor: tile.cost.armor || tile.cost.default || 1,
    flying: tile.cost.flying || tile.cost.default || 1
  });
  const [heal, setHeal] = React.useState(tile.heal || 0);
  const [stats, setStats] = React.useState({
    avd: 0,
    def: 0,
    res: 0,
    ...(tile.stats || {})
  });

  const handleMoveCostChange = (type: keyof typeof cost, value: number) => {
    setCost({ ...cost, [type]: value });
  }

  const handleSave = () => {
    const draft: ITileRecord = {
      ...tile,
      name,
      cost,
      stats,
      heal
    };
    onSave(draft);
  }

  return (
    <Dialog
      open={true}
      onClose={onCancel}
    >
      <DialogContent>
        <div className={
          "bg-[var(--bg-color)] text-[var(--text-color)] p-4 " +
          "flex flex-col gap-4"
        }>
          <div>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium">Move cost</h2>
            <div className="flex">
              <div className="grid grid-cols-2 gap-2">
                <NumberField
                  name="infantry"
                  label="Infantry"
                  value={cost.infantry}
                  onChange={(value) => handleMoveCostChange("infantry", value)}
                />
                <NumberField
                  name="cavalry"
                  label="Cavalry"
                  value={cost.cavalry}
                  onChange={(value) => handleMoveCostChange("cavalry", value)}
                />
                <NumberField
                  name="armor"
                  label="Armor"
                  value={cost.armor}
                  onChange={(value) => handleMoveCostChange("armor", value)}
                />
                <NumberField
                  name="flying"
                  label="Flying"
                  value={cost.flying}
                  onChange={(value) => handleMoveCostChange("flying", value)}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">Bonuses</h2>
            <NumberField
              name="avoid"
              label="Avoid"
              value={stats.avd}
              onChange={(value) => setStats({ ...stats, avd: value })}
            />
            <NumberField
              name="defense"
              label="Defense"
              value={stats.def}
              onChange={(value) => setStats({ ...stats, def: value })}
            />
            <NumberField
              name="resistance"
              label="Resistance"
              value={stats.res}
              onChange={(value) => setStats({ ...stats, res: value })}
            />
            <NumberField
              name="heal"
              label="Heal"
              value={heal}
              onChange={(value) => setHeal(value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TileEdit;