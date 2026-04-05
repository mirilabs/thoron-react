import React, { useState } from "react";
import { Button, Checkbox, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { ItemRecord, StaffStats, WeaponStats } from "thoron";
import NumberField from "./NumberField";

const DEFAULT_STATS = {
  weapon: {
    weaponType: "sword" as WeaponStats["weaponType"],
    might: 5,
    hit: 100,
    avd: 0,
    crit: 0,
    ceva: 0,
    minRange: 1,
    maxRange: 1
  },
  staff: {
    targetsAlly: true,
    effect: "heal",
    basePower: 10,
    magicCoeff: 1,
    minRange: 1,
    maxRange: 1
  }
}

function ItemEditor({
  onSave,
  onCancel
}: {
  onSave: (item: ItemRecord) => void,
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<ItemRecord>({
    name: "",
    type: "weapon",
    uses: 0,
    stats: DEFAULT_STATS.weapon
  });

  const setItemType = (type: ItemRecord["type"]) => {
    if (type === "weapon") {
      setFormData({
        ...formData,
        type: "weapon",
        stats: DEFAULT_STATS.weapon
      });
    } else if (type === "staff") {
      setFormData({
        ...formData,
        type: "staff",
        stats: DEFAULT_STATS.staff
      });
    } else {
      const { stats, ...rest } = formData;
      setFormData({ ...rest, type } as ItemRecord);
    }
  }

  return (
    <div className={
      "border border-[var(--accent-color)] rounded-md p-4 " +
      "flex flex-col gap-2 "
    }>
      <TextField required
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Description"
        name="description"
        type="text"
        value={formData.description}
        multiline minRows={2}
        onChange={
          (e) => setFormData({ ...formData, description: e.target.value })
        }
      />
      <div>
        <NumberField
          label="Uses"
          name="uses"
          value={formData.uses}
          min={0}
          onChange={n => setFormData({ ...formData, uses: n })} />
      </div>
      <FormLabel htmlFor="type">Type</FormLabel>
      <Select
        name="type"
        value={formData.type}
        onChange={e => setItemType(e.target.value as ItemRecord["type"])}
      >
        <MenuItem value="weapon">Weapon</MenuItem>
        <MenuItem value="staff">Staff</MenuItem>
        <MenuItem value="consumable">Consumable</MenuItem>
        <MenuItem value="trinket">Trinket</MenuItem>
      </Select>
      <div className="flex flex-col gap-2">
        <ItemStatsEditor data={formData} setData={setFormData} />
      </div>
      <div className="flex flex-row">
        <Button
          variant="contained"
          onClick={() => onSave(formData)}
          startIcon={<i className="fas fa-save" />}>
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
          startIcon={<i className="fas fa-times" />}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function ItemStatsEditor({
  data,
  setData
}: {
  data: ItemRecord,
  setData: (data: ItemRecord) => void
}) {

  switch (data.type) {
    case "weapon":
      return <WeaponStatsEditor data={data} setData={setData} />;
    case "staff":
      return <StaffStatsEditor data={data} setData={setData} />;
    case "consumable":
      return <ConsumableStatsEditor data={data} setData={setData} />;
    case "trinket":
      return <TrinketStatsEditor data={data} setData={setData} />;
    default:
      throw new Error("Invalid item type");
  }
}

function WeaponStatsEditor({
  data,
  setData
}: {
  data: ItemRecord,
  setData: (data: ItemRecord) => void
}) {
  if (data.type !== "weapon") return null;

  const setStat = (stat: keyof WeaponStats, value: number) => {
    setData({
      ...data,
      type: "weapon",
      stats: { ...data.stats, [stat]: value }
    });
  }

  const setWeaponType = (type: WeaponStats["weaponType"]) => {
    setData({
      ...data,
      type: "weapon",
      stats: { ...data.stats, weaponType: type }
    });
  }

  return (
    <>
      <FormLabel htmlFor="weaponType">Weapon Type</FormLabel>
      <Select
        name="weaponType"
        value={data.stats.weaponType}
        onChange={
          e => setWeaponType(e.target.value as WeaponStats["weaponType"])
        } >
        <MenuItem value="sword">Sword</MenuItem>
        <MenuItem value="lance">Lance</MenuItem>
        <MenuItem value="axe">Axe</MenuItem>
        <MenuItem value="tome">Tome</MenuItem>
        <MenuItem value="dagger">Dagger</MenuItem>
        <MenuItem value="bow">Bow</MenuItem>
      </Select>
      <div className="flex flex-row gap-2 flex-wrap">
        <NumberField
          label="Might"
          name="might"
          value={data.stats.might}
          onChange={n => setStat("might", n)} />
        <NumberField
          label="Hit"
          name="hit"
          value={data.stats.hit}
          step={5}
          onChange={n => setStat("hit", n)} />
        <NumberField
          label="Avoid"
          name="avd"
          value={data.stats.avd}
          step={5}
          onChange={n => setStat("avd", n)} />
        <NumberField
          label="Critical"
          name="crit"
          value={data.stats.crit}
          step={5}
          onChange={n => setStat("crit", n)} />
        <NumberField
          label="Critical Evade"
          name="ceva"
          value={data.stats.ceva}
          step={5}
          onChange={n => setStat("ceva", n)} />
        <NumberField
          label="Min. Range"
          name="minRange"
          value={data.stats.minRange}
          min={1}
          onChange={n => setStat("minRange", n)} />
        <NumberField
          label="Max. Range"
          name="maxRange"
          value={data.stats.maxRange}
          min={data.stats.minRange}
          onChange={n => setStat("maxRange", n)} />
      </div>
    </>
  );
}

function StaffStatsEditor({
  data,
  setData
}: {
  data: ItemRecord,
  setData: (data: ItemRecord) => void
}) {
  if (data.type !== "staff") return null;

  const setStat = (
    stat: keyof StaffStats,
    value: StaffStats[keyof StaffStats]
  ) => {
    setData({
      ...data,
      type: "staff",
      stats: { ...data.stats, [stat]: value }
    });
  }

  return (
    <>
      <div className="flex flex-row gap-2">
        <FormLabel htmlFor="targetsAlly">Targets Ally?</FormLabel>
        <Checkbox
          name="targetsAlly"
          checked={data.stats.targetsAlly}
          onChange={e => setStat("targetsAlly", e.target.checked)} />
      </div>
      <div className="flex flex-col">
        <FormLabel htmlFor="effect">Effect</FormLabel>
        <Select
          name="effect"
          value={data.stats.effect}
          onChange={
            e => setStat("effect", e.target.value as StaffStats["effect"])
          }>
          <MenuItem value="heal">Heal</MenuItem>
        </Select>
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        <NumberField
          label="Base Power"
          name="basePower"
          value={data.stats.basePower}
          onChange={n => setStat("basePower", n)} />
        <NumberField
          label="Magic Coeff."
          name="magicCoeff"
          value={data.stats.magicCoeff}
          onChange={n => setStat("magicCoeff", n)} />
        <NumberField
          label="Min. Range"
          name="minRange"
          value={data.stats.minRange}
          min={1}
          onChange={n => setStat("minRange", n)} />
        <NumberField
          label="Max. Range"
          name="maxRange"
          value={data.stats.maxRange}
          min={data.stats.minRange}
          onChange={n => setStat("maxRange", n)} />
      </div>
    </>
  );
}

function ConsumableStatsEditor({
  data,
  setData
}: {
  data: ItemRecord,
  setData: (data: ItemRecord) => void
}) {
  return (
    <>
    </>
  );
}

function TrinketStatsEditor({
  data,
  setData
}: {
  data: ItemRecord,
  setData: (data: ItemRecord) => void
}) {
  return (
    <>
    </>
  );
}

export default ItemEditor;