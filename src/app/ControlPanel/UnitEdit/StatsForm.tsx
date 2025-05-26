import React from 'react';
import { IUnitRecord } from 'thoron';
import NumberField from './NumberField';
import StatField, { GrowthField, StatFieldProps } from './StatField';
import "./StatsForm.scss";

interface StatsFormProps {
  data: IUnitRecord;
  setData: (data: IUnitRecord) => void;
}

const STATS = [
  { label: "Max HP",      stat: "mhp" },
  { label: "Strength",    stat: "str" },
  { label: "Magic",       stat: "mag" },
  { label: "Skill",       stat: "skl" },
  { label: "Speed",       stat: "spd" },
  { label: "Luck",        stat: "luk" },
  { label: "Defense",     stat: "def" },
  { label: "Resistance",  stat: "res" },
]

function StatsForm({ data, setData }: StatsFormProps) {
  const statFields = [];
  STATS.forEach(({ label, stat }) => {
    statFields.push((
      <StatField key={stat} label={label} stat={stat}
        data={data} setData={setData} />
    ));
    statFields.push((
      <GrowthField key={stat + "_growth"} label={label} stat={stat}
        data={data} setData={setData} />
    ));
  });

  return (
    <div className="unit-stats-form">
      <div className="level-inputs">
        <NumberField
          label="Level"
          name="level"
          value={data.level}
          onChange={(value) => setData({ ...data, level: value })}
          min={1} max={40}
          required />
        <NumberField
          label="EXP"
          name="exp"
          value={data.exp}
          onChange={(value) => setData({ ...data, exp: value })}
          min={0} max={99} step={1} />
      </div>
      <div className="stat-inputs">
        <h3>Stats</h3>
        <h3>Growths</h3>
        {statFields}
      </div>
    </div>
  )
}

export default StatsForm;