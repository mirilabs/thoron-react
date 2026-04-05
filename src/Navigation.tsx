import { Link } from "react-router";
import "./Navigation.scss";
import React from "react";
import { Button } from "@mui/material";

function NavButton({ to, label, icon }: {
  to: string,
  label: string
  icon?: string
}) {
  const iconElement = icon ? <i className={`fas fa-${icon}`} /> : null;

  return (
    <Link to={to} className="nav-link">
      <Button variant="text"
        sx={{ flex: 1, flexDirection: "column", gap: 0.5, py: 1 }}>
        {iconElement}
        {label}
      </Button>
    </Link>
  )
}

function Navigation() {
  return (
    <nav>
      <NavButton to="/" label="Home" icon="house" />
      <NavButton to="/gameplay" label="Gameplay" icon="gamepad" />
    </nav>
  )
}

export default Navigation;