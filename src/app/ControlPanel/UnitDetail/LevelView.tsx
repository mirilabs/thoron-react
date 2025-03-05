import "./LevelView.scss";
import React from 'react';
import { IUnitRecord } from 'thoron';

interface LevelViewProps {
  record: IUnitRecord;
}

function LevelView({ record }: LevelViewProps) {
  return (
    <div className="unit-detail__level">
      <h3 className="level">
        level {record.level}
      </h3>
      <div className="exp">
        <strong>exp </strong>
        {record.exp}
        <meter className="exp-bar" value={record.exp} max={100} />
      </div>
    </div>
  )
}

export default LevelView;