import "./InventoryQuickView.scss";
import React, { useContext, useState } from "react";
import ItemTitle from "../ControlPanel/Items/ItemTitle";
import { useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import {
  useControllerDispatch
} from "@/app/gameplay/utils/reduxHooks";
import { itemSelected } from "@/shared/store";

function InventoryQuickView() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useControllerDispatch();

  const unit = useSelectedUnit();
  const setEquipped = (index: number) => {
    unit.equip(index);
    dispatch(itemSelected(index));
  }

  const handleOpenMenu = () => {
    if (unit.record.items.length > 1) {
      setOpen(true);
    }
  }

  const handleItemSelect = (index: number) => {
    setEquipped(index);
    setOpen(false);
  }

  if (!unit) return null;

  const items = unit.record.items;
  let itemElems: JSX.Element | JSX.Element[];

  if (items.length === 0) return (
    <div className="weapon-selector">
      <div className={
        "item-title cursor-default " +
        "text-[var(--text-color-2)] italic"
      }>
        (no items)
      </div>
    </div>
  );

  if (!isOpen) {
    // render currently equipped weapon    
    let item = items[unit.state.equippedIndex]
    itemElems = (
      <ItemTitle item={item} onClick={handleOpenMenu} />
    );
  }
  else {
    // render all items
    itemElems = items.map((item, i) => {
      if (item.type === "weapon") return (
        <ItemTitle key={i} item={item}
          onClick={() => { handleItemSelect(i) }} />
      );
      else return (
        <ItemTitle key={i} item={item} />
      )
    });

    // move equipped item to top of list
    const [equipped] = itemElems.splice(unit.state.equippedIndex, 1);
    itemElems.unshift(equipped);
  }

  return (
    <div className="weapon-selector">
      {itemElems}
    </div>
  )
}

export default InventoryQuickView;