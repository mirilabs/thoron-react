import React from "react";
import ConfirmButton from "./ConfirmButton";

interface DeleteButtonProps {
  onDelete: () => void;
  variant?: "inline" | "alert";
  message?: string;
  label?: string;
  button?: React.ReactNode;
}

function DeleteButton({
  onDelete,
  variant = "inline",
  label,
  message,
  button
}: DeleteButtonProps) {
  const sx = label ? {
    color: "var(--error-color)",
    borderColor: "var(--error-color)",
    "&:hover": {
      color: "var(--error-color)",
      borderColor: "var(--error-color)"
    }
  } : undefined;

  return (
    <ConfirmButton
      onConfirm={onDelete}
      variant={variant}
      message={message || (
        variant === "inline" 
          ? "Delete?" 
          : "Are you sure you want to delete this?"
      )}
      label={label}
      confirmLabel="Delete"
      button={button}
      icon={label || !button ? "fas fa-trash" : undefined}
      color="error"
      sx={sx}
    />
  );
}

export default DeleteButton;