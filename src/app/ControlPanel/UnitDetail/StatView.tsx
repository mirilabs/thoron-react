import "./StatView.scss";
import React, { useState } from "react";
import { StatBlock } from "thoron";

interface StatRowProps {
  statName: string,
  value: number,
  maxValue: number,
  isGrowth: boolean
}

function StatRow({ statName, value, maxValue, isGrowth }: StatRowProps) {
  const baseClass = isGrowth ? "growth" : "stat";

  return (
    <div className="stat-container" key={statName}>
      <span className="stat-name">
        {statName}
      </span>
      <span className={`stat-value ${baseClass}`}>
        {value + (isGrowth ? '%' : '')}
      </span>
      <span className="stat-meter">
        <span className={`stat-meter__value ${baseClass}`}
          style={{ width: `${value / maxValue * 100}%`}}>
        </span>
      </span>
    </div>
  )
}

interface StatViewProps {
  stats: StatBlock,
  growths: StatBlock
}

function StatView({ stats, growths }: StatViewProps) {
    const [viewGrowths, setViewGrowths] = useState(false);
    const gaugeMax = viewGrowths ? 100 : 60;
    
    const values = viewGrowths ? growths : stats;
    const rows = Object.entries(values).map(([statName, value]) => (
      <StatRow key={statName}
        statName={statName}
        value={value}
        maxValue={gaugeMax}
        isGrowth={viewGrowths} />
    ));
    
    if (!stats) return;
    return (
      <div className="unit-detail__stats">
        <button className={viewGrowths ? '' : 'selected'}
          onClick={() => setViewGrowths(false)}>
            Stats
        </button>
        <button className={viewGrowths ? 'selected' : ''}
          onClick={() => setViewGrowths(true)}>
            Growths
        </button>
        {rows}
      </div>
    )
  }

  export default StatView;