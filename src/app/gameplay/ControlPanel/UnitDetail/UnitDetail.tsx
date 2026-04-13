import "./UnitDetail.scss";
import React from "react";
import StatView from "./StatView";
import Inventory from "../Items/Inventory";
import { Character } from "@/data/db";
import { IconButton } from "@mui/material";
import moveTypeIcons from "@/icons/movetypes";
import MoveTypeIcon from "./MoveTypeIcon";

interface UnitDetailProps {
  record: Character,
  handleStartEdit?: () => void;
  handleClose?: () => void;
}

function UnitDetail(props: UnitDetailProps) {
  const { record, handleStartEdit, handleClose } = props;

  const {
    name,
    className,
    stats,
    growths,
    items,
  } = record;

  const portraitUrl = record.portrait instanceof Blob ?
    URL.createObjectURL(record.portrait) :
    record.portrait;

  return (
    <div className="flex flex-col gap-4">
      {
        (handleStartEdit || handleClose) && (
          <div className="flex flex-row justify-end">
            <span className="flex flex-row gap-2">
              {
                handleStartEdit && (
                  <IconButton onClick={handleStartEdit}>
                    <i className="fas fa-edit" />
                  </IconButton>
                )
              }
              {
                handleClose && (
                  <IconButton onClick={handleClose}>
                    <i className="fas fa-x" />
                  </IconButton>
                )
              }
            </span>
          </div>
        )
      }
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
          <div className={
            "flex flex-row justify-between items-baseline gap-4 " +
            "border-b border-[var(--accent-color)] pb-2 mb-2"
          }>
            <span className="flex flex-row gap-1">
              <p>level</p>
              <p>{record.level}</p>
            </span>
            <span className="flex flex-row gap-1">
              <p>move</p>
              <p>{record.movement}</p>
              <MoveTypeIcon moveType={record.moveType} />
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p>exp</p>
            <p>{record.exp}</p>
            <meter className="unit-detail__exp-bar"
              value={record.exp}
              max={100} />
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        <Inventory items={items} />
        <StatView stats={stats} growths={growths} />
      </div>
    </div>
  )
}

export default UnitDetail;
export type {
  UnitDetailProps
}