import React from 'react';
import { IUnitRecord } from 'thoron';
import NumberField from './NumberField';
import StatField from './StatField';

interface StatsFormProps {
  data: IUnitRecord;
  setData: (data: IUnitRecord) => void;
}

function StatsForm({ data, setData }: StatsFormProps) {
  return (
    <div>
      <div>
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
      <div>
        <StatField label="Max HP" stat="mhp"
          data={data} setData={setData} />
        <StatField label="Strength" stat="str"
          data={data} setData={setData} />
        <StatField label="Magic" stat="mag"
          data={data} setData={setData} />
        <StatField label="Skill" stat="skl"
          data={data} setData={setData} />
        <StatField label="Speed" stat="spd"
          data={data} setData={setData} />
        <StatField label="Luck" stat="luk"
          data={data} setData={setData} />
        <StatField label="Defense" stat="def"
          data={data} setData={setData} />
        <StatField label="Resistance" stat="res"
          data={data} setData={setData} />
      </div>
    </div>
  )
}

export default StatsForm;