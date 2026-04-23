import "./UnitDetail.scss";
import React from "react";
import StatView from "./StatView";
import Inventory from "../Items/Inventory";
import { Character } from "@/data/db";
import { IconButton } from "@mui/material";
import { DeployedUnit } from "thoron";
import BasicInfoView from "./BasicInfoView";
import CurrentStateView from "./CurrentStateView";

interface UnitDetailProps {
  record: Character,
  unit?: DeployedUnit,
  handleStartEdit?: () => void;
  handleClose?: () => void;
}

function UnitDetail({
  record,
  unit,
  handleStartEdit,
  handleClose
}: UnitDetailProps) {
  const { stats, growths, items } = record;
  const state = unit?.state;

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
      {
        unit && <CurrentStateView unit={unit} />
      }
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