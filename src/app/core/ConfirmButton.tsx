import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  Button,
  DialogActions
} from "@mui/material";

interface ConfirmButtonProps {
  onConfirm: () => void;
  variant?: "inline" | "alert";
  message?: string;
  label?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  button?: React.ReactNode;
  icon?: string;
  color?: 
    | "inherit" 
    | "primary" 
    | "secondary" 
    | "success" 
    | "error" 
    | "info" 
    | "warning";
  sx?: any;
}

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  color = "primary"
}: ConfirmButtonProps & { open: boolean, onClose: () => void }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      {message && (
        <DialogContent>
          {message}
        </DialogContent>
      )}
      <DialogActions>
        <Button
          color="inherit"
          size="small"
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
        <Button
          color={color}
          variant="contained"
          size="small"
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ConfirmButton({
  onConfirm,
  variant = "inline",
  label,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  button,
  icon,
  color = "primary",
  sx
}: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    onConfirm();
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
        color={color}
        onClick={() => setConfirming(true)}
        startIcon={icon ? <i className={icon} /> : undefined}
        sx={sx}
      >
        {label}
      </Button>
    )
  }
  else {
    buttonElem = (
      <IconButton
        size="small"
        color={color}
        onClick={() => setConfirming(true)}
        sx={sx}
      >
        {icon ? (
          <i className={icon} />
        ) : (
          <i className="fas fa-question" />
        )}
      </IconButton>
    )
  }

  if (variant === "alert") {
    return (
      <>
        {buttonElem}
        <ConfirmDialog
          open={confirming}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          message={message}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          color={color}
        />
      </>
    )
  }

  if (confirming) return (
    <div className="flex flex-row items-center">
      {message && (
        <p className="text-[var(--text-color-2)]">
          {message}
        </p>
      )}
      <IconButton
        size="small"
        color="success"
        onClick={handleConfirm}
      >
        <i className="fas fa-check" />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={handleCancel}
      >
        <i className="fas fa-times" />
      </IconButton>
    </div>
  )
  else return buttonElem;
}

export default ConfirmButton;
