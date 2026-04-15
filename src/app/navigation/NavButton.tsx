import React from "react";
import { Link } from "react-router";
import { Button, IconButton } from "@mui/material";

interface NavButtonProps {
  to: string;
  label: string;
  icon?: string;
  variant?: "standard" | "icon-only";
}

function NavButton({
  to,
  label,
  icon,
  variant = "standard"
}: NavButtonProps) {
  const iconElement = icon ? <i className={`fas fa-${icon}`} /> : null;

  return (variant === "icon-only") ? (
    <Link to={to} className={
      "hover:bg-[var(--bg-color-2)] transition-colors duration-200 " +
      "flex flex-1 items-center p-2 justify-center "
    }>
      <IconButton>
        {iconElement}
      </IconButton>
    </Link>
  ) : (
    <Link to={to}>
      <Button variant="text"
        sx={{ flex: 1, flexDirection: "column", gap: 0.5, py: 1 }}>
        {iconElement}
        {label}
      </Button>
    </Link>
  )
}

export default NavButton;
export type { NavButtonProps };