import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import SettingsForm from "./SettingsForm";

function SettingsRoot() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <IconButton
        onClick={toggleOpen}
        className="h-full aspect-square"
        aria-label="Settings">
        <i className="fas fa-cog" />
      </IconButton>

      <Dialog open={open} onClose={toggleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <SettingsForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SettingsRoot;