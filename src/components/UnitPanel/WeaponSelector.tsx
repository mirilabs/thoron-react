import "./WeaponSelector.scss";
import React, { useState } from "react";
import ItemShow from "./ItemShow";
import { useUIEmitter } from "components/utils/useUIAction";

function WeaponSelector({ unit }) {
  const [selecting, setSelecting] = useState(false);
  const setEquipped = useUIEmitter('set_equipped_index');

  const handleOpenMenu = () => {
    if (unit.record.items.length > 1) {
      setSelecting(true);
    }
  }

  const handleItemSelect = (index: number) => {
    setEquipped(index);
    setSelecting(false);
  }

  if (!unit) return null;

  const items = unit.record.items;
  let itemElems;

  if (!selecting) {
    // render currently equipped weapon    
    let item = items[unit.state.equippedIndex]
    itemElems = (
      <ItemShow item={item} onClick={handleOpenMenu} />
    );
  }
  else {
    // render all weapons
    itemElems = items.filter((item) => item["weapon"] !== undefined)
      .map((item, i) => (
        <ItemShow item={item} key={i} onClick={() => { handleItemSelect(i) }} />
      ));

    // move equipped item to top of list
    const [ equipped ] = itemElems.splice(unit.state.equippedIndex, 1);
    itemElems.unshift(equipped);
  }

  return (
    <div className="weapon-selector">
      {itemElems}
    </div>
  )
}

export default WeaponSelector;