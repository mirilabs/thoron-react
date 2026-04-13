import React, { useContext, useState } from "react";
import ThoronContext from "../../ThoronContext";
import UnitAdd from "./UnitAdd";
import {
  useControllerDispatch,
  useControllerSelector
} from "../../utils/reduxHooks";
import { ChapterEditMode, chapterEditModeChanged } from "@/shared/store";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function ChapterEdit() {
  const { controller } = useContext(ThoronContext);
  const dispatch = useControllerDispatch();

  const editMode = useControllerSelector(state => state.editMode);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: ChapterEditMode
  ) => {
    dispatch(chapterEditModeChanged(value));
  }

  return (
    <div className="flex flex-col gap-2">
      <UnitAdd controller={controller} />
      <ToggleButtonGroup
        exclusive
        value={editMode}
        onChange={handleModeChange}
      >
        <ToggleButton value="unit_move">
          Move Unit
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ChapterEdit;