import React from 'react';
import NumberField from './NumberField';
import StatField, { GrowthField } from './StatField';
import "./StatsForm.scss";
import { Character } from '@/data/db';

interface StatsFormProps {
  data: Character;
  setData: (data: Character) => void;
}

const STATS = [
  { label: "Max HP", stat: "mhp" },
  { label: "Strength", stat: "str" },
  { label: "Magic", stat: "mag" },
  { label: "Skill", stat: "skl" },
  { label: "Speed", stat: "spd" },
  { label: "Luck", stat: "luk" },
  { label: "Defense", stat: "def" },
  { label: "Resistance", stat: "res" },
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

  const statsSum = STATS.reduce((acc, { stat }) => acc + data.stats[stat], 0);
  const growthsSum = STATS.reduce(
    (acc, { stat }) => acc + data.growths[stat], 0
  );

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
        <p>Total stats: {statsSum}</p>
        <p>Total growths: {growthsSum}</p>
      </div>
    </div>
  )
}

export default StatsForm;