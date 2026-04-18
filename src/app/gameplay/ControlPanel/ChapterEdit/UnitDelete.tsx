import React from "react";
import { useControllerSelector } from "../../utils/reduxHooks";
import { useSelectedUnit } from "../../utils/useUnit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useControllerDispatch } from "../../utils/reduxHooks";
import { chapterEditModeChanged, unitSelected } from "@/shared/store";
import { useThoronContext } from "../../ThoronContext";

/**
 * Dialog to delete a unit
 */
function UnitDelete() {
  const selectedUnit = useSelectedUnit();
  const name = selectedUnit?.record.name ?? "";

  const editMode = useControllerSelector(state => state.editMode);
  const dispatch = useControllerDispatch();

  const { controller } = useThoronContext();

  const handleConfirm = () => {
    const id = selectedUnit.id;
    dispatch(unitSelected(null));
    dispatch(chapterEditModeChanged(null));
    controller.removeUnit(id);
  }

  const handleClose = () => {
    dispatch(chapterEditModeChanged(null));
  }

  return (
    <Dialog
      open={editMode === "unit_delete" && selectedUnit !== null}
      onClose={handleClose}
      onTransitionExited={() => dispatch(unitSelected(null))}
    >
      <DialogTitle>
        Delete Unit
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {name || "this unit"}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnitDelete;