import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  Button,
  DialogActions
} from "@mui/material";

interface DeleteButtonProps {
  onDelete: () => void;
  variant?: "inline" | "alert";
  message?: string;
  label?: string;
  button?: React.ReactNode;
}

function DeleteDialog({
  open,
  onClose,
  onDelete,
  message
}: DeleteButtonProps & { open: boolean, onClose: () => void }) {
  const handleConfirm = () => {
    onDelete();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {message || "Are you sure you want to delete this?"}
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          size="small"
          onClick={onClose}
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
      </DialogActions>
    </Dialog>
  )
}

function DeleteButton({
  onDelete,
  variant = "inline",
  label,
  message,
  button
}: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    onDelete();
    setConfirming(false);
  }

  const handleCancel = () => {
    setConfirming(false);
  }

  let buttonElem;
  if (button) {
    buttonElem = (
      <div onClick={() => setConfirming(true)}>
        {button}
      </div>
    )
  }
  else if (label) {
    buttonElem = (
      <Button
        variant="outlined"
        size="small"
        onClick={() => setConfirming(true)}
        sx={{
          color: "var(--error-color)",
          borderColor: "var(--error-color)",
          "&:hover": {
            color: "var(--error-color)",
            borderColor: "var(--error-color)"
          }
        }}
        startIcon={<i className="fas fa-trash" />}
      >
        {label}
      </Button>
    )
  }
  else {
    buttonElem = (
      <IconButton
        size="small"
        onClick={() => setConfirming(true)}
      >
        <i className="fas fa-trash" />
      </IconButton>
    )
  }

  if (variant === "alert") {
    return (
      <>
        {buttonElem}
        <DeleteDialog
          open={confirming}
          onClose={handleCancel}
          onDelete={handleConfirm}
          message={message}
        />
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
        <i className="fas fa-check" />
      </IconButton>
      <IconButton
        size="small"
        onClick={handleCancel}
      >
        <i className="fas fa-times" />
      </IconButton>
    </div>
  )
  else return buttonElem;
}

export default DeleteButton;