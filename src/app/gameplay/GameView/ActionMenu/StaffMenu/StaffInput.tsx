import React from "react";
import { useUIEmitter } from "@/app/gameplay/utils/useUIAction";
import StaffIcon from "@/icons/items/staff.svg";

function CombatInput() {
  const cancel = useUIEmitter("cancel");
  const changeTarget = useUIEmitter("down");
  const confirm = useUIEmitter("confirm");

  return (
    <div className="staff-input">
      <button className="cycle-target" onClick={changeTarget}>
        <i className="fas fa-redo-alt" />
        Target
      </button>
      <button className="confirm" onClick={confirm}>
        <img src={StaffIcon}
          alt="staff"
          className="icon" />
        Use
      </button>
      <button className="back" onClick={cancel}>
        <i className="fas fa-x" />
        Back
      </button>
    </div>
  )
}

export default CombatInput;