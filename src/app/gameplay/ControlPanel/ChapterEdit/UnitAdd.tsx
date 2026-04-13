import React from "react";
import { GameController } from "thoron";
import UnitAddForm from "./UnitAddForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

function UnitAdd({ controller }: { controller: GameController }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button variant={open ? "contained" : "text"}
        onClick={() => setOpen(true)}>
        Add Unit
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Unit</DialogTitle>
        <DialogContent>
          <UnitAddForm controller={controller} onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UnitAdd;