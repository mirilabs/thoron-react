import React from "react";
import ActionConfirmInputs from "./ActionConfirmInputs";
import ItemSelect from "./ItemSelect";
import ActionPreview from "./ActionPreview";
import ActionConfirmHandler from "./ActionConfirmHandler";

function ActionConfirmMenu({ show }: { show: boolean }) {
  return (
    <div className={
      "flex flex-col gap-4 " +
      "bg-gradient-to-t from-[var(--bg-color)]/90 to-[var(--bg-color)]/30 " +
      "absolute left-0 right-0 bottom-0 p-6 " +
      "transition-all duration-300 ease-in-out z-50 " +
      (show ? "translate-y-0 opacity-100" :
        "translate-y-full opacity-0 pointer-events-none")
    }>
      <div className="flex flex-row gap-8">
        <div className={
          "hidden sm:flex " +
          "flex-3 flex-col pointer-events-auto min-w-[120px]"
        }>
          <ItemSelect />
        </div>
        <div className="flex-7 pointer-events-auto">
          <ActionPreview />
        </div>
      </div>
      <ActionConfirmInputs />
      <ActionConfirmHandler enabled={show} />
    </div>
  )
}

export default ActionConfirmMenu;