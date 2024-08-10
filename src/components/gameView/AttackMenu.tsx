import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function WeaponMenu({ show }) {
  const props = {
    in: show
  }
}

function TargetMenu({ show }) {
  const props = {
    in: show
  }
}

function AttackMenu() {
  const [visibleMenu, setVisibleMenu] = useState("weapon");

  return (
    <div>
      
    </div>
  )
}

export default AttackMenu;