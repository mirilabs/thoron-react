import React from "react";
import { useUIEmitter } from "@/app/gameplay/utils/useUIAction";

function ActionConfirmInputs() {
  const cancel = useUIEmitter("cancel");
  const changeTarget = useUIEmitter("down");
  const confirm = useUIEmitter("confirm");

  return (
    <div className={
      "grid grid-cols-[1fr_2fr_1fr] gap-4 h-full pointer-events-auto"
    }>
      <div className="flex flex-1 h-full pt-4 pb-4">
        <button className="w-full h-full rounded-md"
          onClick={changeTarget}>
          <i className="fas fa-redo-alt" />
          Target
        </button>
      </div>
      <div className="flex flex-2 h-full">
        <button className="w-full h-full rounded-lg bg-[var(--accent-color)]"
          onClick={confirm}>
          <i className="fas fa-check" />
          Use
        </button>
      </div>
      <div className="flex flex-1 h-full pt-4 pb-4">
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