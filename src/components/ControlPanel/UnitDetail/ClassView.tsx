import "./ClassView.scss";
import React from "react";
import movetypeIcons from "icons/movetypes";
import { IUnitRecord } from "thoron";

interface ClassViewProps { 
  record: IUnitRecord;
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1);
}

function ClassView({ record }: ClassViewProps) {
  const icons = record.classTags.map(tag => {
    if (movetypeIcons[tag]) {
      return (
        <img className="icon movetype-icon"
          alt={tag}
          src={movetypeIcons[tag]}
          key={tag}
          />
      )
    }
    else return null;
  });

  return (
    <div className="unit-detail__class">
      <h3 className="unit-class">
        {capitalize(record.className ?? "(no class)")}
      </h3>
      <div className="movement">
        <span className="label">move</span>
        <span className="value">{record.movement}</span>
        {icons}
      </div>
    </div>
  )
}

export default ClassView;