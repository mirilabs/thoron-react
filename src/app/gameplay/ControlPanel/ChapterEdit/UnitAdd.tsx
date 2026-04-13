import React, { useContext } from "react";
import { GameController } from "thoron";
import UnitAddForm from "./UnitAddForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useThoronContext } from "../../ThoronContext";
import { useControllerDispatch } from "../../utils/reduxHooks";
import { unitSelected } from "@/shared/store";
import { Character } from "@/data/db";

function UnitAdd() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useControllerDispatch();
  const { controller, save } = useThoronContext();

  const handleAddUnit = (unit: Character) => {
    controller.addUnit(unit);
    save();
    dispatch(unitSelected(unit.id));
    setOpen(false);
  }

  return (
    <div>
      <Button variant={open ? "contained" : "text"}
        onClick={() => setOpen(true)}>
        Add Unit
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Unit</DialogTitle>
        <DialogContent>
          <UnitAddForm onDone={handleAddUnit} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UnitAdd;