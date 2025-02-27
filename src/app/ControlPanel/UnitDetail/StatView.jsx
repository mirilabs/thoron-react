import "./StatView.scss";
import React, { useState } from "react";

function StatView({ stats, growths }) {
    const [viewGrowths, setViewGrowths] = useState(false);
    const gaugeMax = viewGrowths ? 100 : 60;
    
    const values = viewGrowths ? growths : stats;
    const rows = Object.entries(values).map(([name, value]) => (
      <div className={'stat' + (viewGrowths ? ' stat-growths' : '')} key={name}>
        <span className="stat-name">{name}</span>
        <span className="stat-value">{value + (viewGrowths ? '%' : '')}</span>
        <meter className="stat-meter" value={value} max={gaugeMax}></meter>
      </div>
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