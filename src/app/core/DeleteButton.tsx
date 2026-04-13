import React, { useState } from "react";
import { IconButton, Alert, Dialog, DialogContent, Button, Box } from "@mui/material";

interface DeleteButtonProps {
  onDelete: () => void;
  variant?: "inline" | "alert";
  label?: string;
}

function DeleteButton({
  onDelete,
  variant = "inline",
  label
}: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    onDelete();
    setConfirming(false);
  }

  if (variant === "alert") {
    return (
      <>
        <IconButton
          size="small"
          onClick={() => setConfirming(true)}
        >
          <i className="fas fa-trash" />
        </IconButton>
        <Dialog open={confirming} onClose={() => setConfirming(false)}>
          <DialogContent sx={{ p: 0 }}>
            <Alert
              severity="warning"
              variant="filled"
              sx={{ alignItems: 'center' }}
              action={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => setConfirming(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={handleConfirm}
                  >
                    Delete
                  </Button>
                </Box>
              }
            >
              {label || "Are you sure you want to delete this?"}
            </Alert>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  if (confirming) return (
    <div className="flex flex-row items-center">
      <p className="text-[var(--text-color-2)]">Delete?</p>
      <IconButton
        size="small"
        onClick={handleConfirm}
      >
        <i className="fas fa-check text-green-500" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => setConfirming(false)}
      >
        <i className="fas fa-times text-red-500" />
      </IconButton>
    </div>
  )
  else return (
    <IconButton
      size="small"
      onClick={() => setConfirming(true)}
    >
      <i className="fas fa-trash" />
    </IconButton>
  )
}

export default DeleteButton;