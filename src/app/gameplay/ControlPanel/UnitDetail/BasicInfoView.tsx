import React from 'react';
import { Character } from "@/data/db";
import MoveTypeIcon from "./MoveTypeIcon";

interface BasicInfoViewProps {
  record: Character;
}

function BasicInfoView({ record }: BasicInfoViewProps) {
  const {
    name,
    className,
    portrait,
    level,
    exp,
    movement,
    moveType
  } = record;

  const portraitUrl = portrait instanceof Blob ?
    URL.createObjectURL(portrait) :
    portrait;

  return (
    <div className="flex flex-row gap-4 justify-center">
      <img className="w-24 h-24" src={portraitUrl} alt={name} />
      <div className="flex flex-col">
        <div className={
          "flex flex-row justify-between items-baseline gap-4 " +
          "border-b border-[var(--accent-color)] pb-2 mb-2"
        }>
          <h1 className="text-2xl font-bold">{name}</h1>
          <h2 className="text-lg">{className}</h2>
        </div>
        <div className="flex flex-row justify-between items-baseline gap-4">
          <span className="flex flex-row gap-1">
            <p>level</p>
            <p>{level}</p>
          </span>
          <span className="flex flex-row gap-1">
            <p>move</p>
            <p>{movement}</p>
            <MoveTypeIcon moveType={moveType} />
          </span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p>exp</p>
          <p>{exp}</p>
          <meter className="unit-detail__exp-bar"
            value={exp}
            max={100} />
        </div>
      </div>
    </div>
  )
}

export default BasicInfoView;