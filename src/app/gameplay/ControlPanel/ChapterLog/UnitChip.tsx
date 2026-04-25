import { Character } from "@/data/db";
import React from "react";
import { DeployedUnit, IDeploymentState } from "thoron";
import { useControllerDispatch } from "../../utils/reduxHooks";
import { unitSelected } from "@/shared/store";

export interface UnitChipProps {
  unit: DeployedUnit | IDeploymentState
  clickToSelect?: boolean
}

function UnitChip({
  unit,
  clickToSelect = true
}: UnitChipProps) {
  const dispatch = useControllerDispatch();

  const handleClick = clickToSelect ? () => {
    dispatch(unitSelected(unit?.id));
  } : undefined;

  if (!unit) return (
    <div className="flex flex-row gap-1">
      <p className="font-bold">??</p>
    </div>
  );

  const { name, mapSprite } = unit.record as Character;
  const src = mapSprite instanceof Blob ?
    URL.createObjectURL(mapSprite) :
    mapSprite;

  const className = [
    "flex",
    "flex-row",
    "gap-1",
    "items-center",
    "rounded-md",
    "p-1",
    clickToSelect ? "hover:bg-[var(--bg-color)] cursor-pointer" : "",
    "transition-colors duration-100"
  ].join(" ");

  return (
    <div onClick={handleClick} className={className}>
      {src &&
        <img src={src} alt={name}
          className="w-[32px] h-[32px] object-contain"
        />
      }
      <p className="font-bold">{name}</p>
    </div>
  );
}

export default UnitChip;
