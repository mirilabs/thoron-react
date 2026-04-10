import React, { useState } from "react";
import { IconButton } from "@mui/material";

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    onDelete();
    setConfirming(false);
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