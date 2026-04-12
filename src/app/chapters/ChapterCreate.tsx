import React, { useState } from "react";
import db from "@/data/db";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router";

function ChapterCreate({ campaignId }: { campaignId: number }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const chapterId = await db.chapters.add({
      campaignId,
      name,
    });
    setName("");
    setOpen(false);
    navigate(`/chapters/${chapterId}`);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}
        startIcon={<i className="fas fa-plus" />}>
        New Chapter
      </Button>
      {open &&
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create Chapter</DialogTitle>
          <DialogContent style={{ paddingTop: "4px" }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Create</Button>
          </DialogActions>
        </Dialog>
      }
    </>
  )
}

export default ChapterCreate;