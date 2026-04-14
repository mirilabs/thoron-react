import React from "react";
import UnitAddForm from "./UnitAddForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useThoronContext } from "../../ThoronContext";
import { useControllerDispatch } from "../../utils/reduxHooks";
import { unitSelected } from "@/shared/store";
import { Character } from "@/data/db";
import { Team } from "thoron";

function UnitAdd() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useControllerDispatch();
  const { controller, save } = useThoronContext();

  const handleAddUnit = (unit: Character, team: Team) => {
    controller.addUnit(unit, team);
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
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogContent>
          <UnitAddForm onDone={handleAddUnit} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UnitAdd;