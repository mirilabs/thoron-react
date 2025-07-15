import React from "react";
import { useUIEmitter } from "@/app/utils/useUIAction";

function CombatInput() {
  const cancel = useUIEmitter("cancel");
  const changeTarget = useUIEmitter("down");
  const changeWeapon = useUIEmitter("right");
  const confirm = useUIEmitter("confirm");

  return (
    <div className="combat-input">
      <button className="cycle-target" onClick={changeTarget}>
        <i className="fas fa-redo-alt" />
        Target
      </button>
      <button className="cycle-weapon" onClick={changeWeapon}>
        <i className="fas fa-redo-alt" />
        Weapon
      </button>
      <button className="confirm" onClick={confirm}>
        <img src="https://www.svgrepo.com/show/254421/sword.svg"
          alt="attack"
          className="icon" />
        Attack
      </button>
      <button className="back" onClick={cancel}>
        <i className="fas fa-x" />
        Back
      </button>
    </div>
  )
}

export default CombatInput;