import React from "react";
import { useThoronContext } from "../../ThoronContext";
import UnitAdd from "./UnitAdd";
import {
  useControllerDispatch,
  useControllerSelector
} from "../../utils/reduxHooks";
import { ChapterEditMode, chapterEditModeChanged } from "@/shared/store";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import DeleteButton from "@/app/core/DeleteButton";
import db from "@/data/db";
import { useNavigate } from "react-router";

function ChapterEdit() {
  const dispatch = useControllerDispatch();

  const editMode = useControllerSelector(state => state.editMode);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: ChapterEditMode
  ) => {
    dispatch(chapterEditModeChanged(value));
  }

  const { chapterId } = useThoronContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const chapter = await db.chapters.get(chapterId);
    if (!chapter) return;
    await db.chapters.delete(chapterId);
    navigate(`/campaigns/${chapter.campaignId}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <UnitAdd />
      <ToggleButtonGroup
        exclusive
        value={editMode}
        onChange={handleModeChange}
      >
        <ToggleButton value="unit_move">
          Move Unit
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="flex flex-row items-center gap-2">
        <DeleteButton
          label="Delete this chapter?"
          variant="alert"
          onDelete={handleDelete}
          button={
            <Button
              color="error"
              variant="contained"
              size="small"
            >
              Delete Chapter
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default ChapterEdit;