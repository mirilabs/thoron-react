import { Character } from "@/data/db";
import React from "react";
import { DeployedUnit, IDeploymentState } from "thoron";
import { useControllerDispatch } from "../../utils/reduxHooks";
import { unitSelected } from "@/shared/store";

export interface UnitChipProps {
  unit: DeployedUnit | IDeploymentState
}

function UnitChip({ unit }: UnitChipProps) {
  const dispatch = useControllerDispatch();

  const handleClick = () => {
    dispatch(unitSelected(unit?.id));
  }

  if (!unit) return (
    <div className="flex flex-row gap-1">
      <p className="font-bold">??</p>
    </div>
  );

  const { name, mapSprite } = unit.record as Character;
  const src = mapSprite instanceof Blob ?
    URL.createObjectURL(mapSprite) :
    mapSprite;

  return (
    <div onClick={handleClick} className={
      "flex flex-row gap-1 items-center " +
      "rounded-md p-1 " +
      "hover:bg-[var(--bg-color)] transition-colors duration-100 cursor-pointer"
    }>
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
