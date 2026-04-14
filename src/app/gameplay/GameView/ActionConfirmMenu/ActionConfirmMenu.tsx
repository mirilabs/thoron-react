import React from "react";
import ActionConfirmInputs from "./ActionConfirmInputs";
import ItemSelect from "./ItemSelect";
import ActionPreview from "./ActionPreview";

function ActionConfirmMenu({ show }: { show: boolean }) {
  return (
    <div className={
      "grid grid-cols-[0.3fr_0.7fr] grid-rows-[auto_100px] " +
      "gap-x-8 gap-y-4 " +
      "bg-gradient-to-t from-[var(--bg-color)]/90 to-[var(--bg-color)]/30 " +
      "absolute left-0 right-0 bottom-0 p-6 " +
      "transition-all duration-300 ease-in-out z-50 " +
      (show ? "translate-y-0 opacity-100" :
        "translate-y-full opacity-0 pointer-events-none")
    }>
      <div className="flex flex-1 flex-col pointer-events-auto min-w-[160px]">
        <ItemSelect />
      </div>
      <div className="flex flex-1 flex-col pointer-events-auto">
        <ActionPreview />
      </div>
      <div className="col-span-2 pointer-events-auto">
        <ActionConfirmInputs />
      </div>
    </div>
  )
}

export default ActionConfirmMenu;