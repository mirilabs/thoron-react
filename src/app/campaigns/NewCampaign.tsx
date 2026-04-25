import db from "@/data/db";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";

const TITLE_MAX_LENGTH = 96;

function NewCampaignForm({ isOpen, setIsOpen }: {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}) {
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleSubmit = async () => {
    if (title.length > TITLE_MAX_LENGTH) {
      setError(`Title must be ${TITLE_MAX_LENGTH} characters or shorter`);
      return;
    }
    let res = await db.campaigns.add({ title });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>New Campaign</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={title.length === 0}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function NewCampaign() {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isOpen) return (
    <Button variant="contained" onClick={() => setIsOpen(true)}>
      New Campaign
    </Button>
  )

  return (
    <NewCampaignForm isOpen={isOpen} setIsOpen={setIsOpen} />
  )
}