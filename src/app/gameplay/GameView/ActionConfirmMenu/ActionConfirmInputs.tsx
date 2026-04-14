import React from "react";
import { useUIEmitter } from "@/app/gameplay/utils/useUIAction";

function ActionConfirmInputs() {
  const cancel = useUIEmitter("cancel");
  const changeTarget = useUIEmitter("down");
  const confirm = useUIEmitter("confirm");

  return (
    <div className="flex flex-row h-full gap-4">
      <div className="flex flex-1 h-full p-4">
        <button className="w-full h-full rounded-md"
          onClick={changeTarget}>
          <i className="fas fa-redo-alt" />
          Target
        </button>
      </div>
      <div className="flex flex-2 h-full">
        <button className="w-full h-full rounded-lg"
          onClick={confirm}>
          <i className="fas fa-check" />
          Use
        </button>
      </div>
      <div className="flex flex-1 h-full p-4">
        <button className="w-full h-full rounded-md"
          onClick={cancel}>
          <i className="fas fa-x" />
          Back
        </button>
      </div>
    </div>
  )
}

export default ActionConfirmInputs;