import React from "react";
import { useDispatch } from "react-redux";
import { actionSelected } from "@/shared/store";
import { useUIEmitter } from "../../utils/useUIAction";
import { Command } from "thoron";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ActionButton({ unitAction, isSelectable=true }: {
  unitAction: Command,
  isSelectable?: boolean
}) {
  const dispatch = useDispatch();
  const selectAction = useUIEmitter("select_action");

  const handleClick = () => {
    if (isSelectable) {
      dispatch(actionSelected(unitAction));
      selectAction(unitAction);
    }
  }

  return (
    <li onClick={handleClick} className={isSelectable ? "" : "faded"}>
      {capitalize(unitAction)}
    </li>
  )
}

export default ActionButton;