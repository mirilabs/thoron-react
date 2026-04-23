import "./UnitDetail.scss";
import React from "react";
import StatView from "./StatView";
import Inventory from "../Items/Inventory";
import { Character } from "@/data/db";
import { IconButton } from "@mui/material";
import { IUnitState } from "thoron";
import BasicInfoView from "./BasicInfoView";

interface UnitDetailProps {
  record: Character,
  state?: IUnitState,
  handleStartEdit?: () => void;
  handleClose?: () => void;
}

function UnitDetail({
  record,
  state,
  handleStartEdit,
  handleClose
}: UnitDetailProps) {
  const { stats, growths, items } = record;

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
      <BasicInfoView record={record} />
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