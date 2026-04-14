import React from "react";
import { useUIEmitter } from "@/app/gameplay/utils/useUIAction";
import StaffIcon from "@/icons/items/staff.svg";
import { Button } from "@mui/material";

function CombatInput() {
  const cancel = useUIEmitter("cancel");
  const changeTarget = useUIEmitter("down");
  const confirm = useUIEmitter("confirm");

  const staffIcon = (
    <img src={StaffIcon} alt="staff" className="icon alt" />
  )

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 p-4 h-full">
        <Button variant="outlined" size="large"
          onClick={changeTarget}
          startIcon={<i className="fas fa-redo-alt" />}>
          Target
        </Button>
      </div>
      <div className="flex flex-2 p-4 h-full">
        <Button variant="contained" size="large"
          onClick={confirm}
          startIcon={staffIcon}>
          Use
        </Button>
      </div>
      <div className="flex flex-1 p-4 h-full">
        <Button variant="outlined" size="large"
          onClick={cancel}
          startIcon={<i className="fas fa-x" />}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default CombatInput;