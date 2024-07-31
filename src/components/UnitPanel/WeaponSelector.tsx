import "./WeaponSelector.scss";
import React from "react";
import ItemShow from "./ItemShow";

function WeaponSelector({ unit }) {
  if (!unit) return null;

  let inv = unit.items.filter((item) => item["weapon"] !== undefined);
  
  // move equipped item to top of array
  const [ equipped ] = inv.splice(unit.state.equippedIndex, 1);
  inv.unshift(equipped);
  
  const itemElems = inv.map((item, i) => (
    <ItemShow item={item} key={i} />
  ));

  return (
    <div className="weapon-selector">
      {itemElems}
    </div>
  )
}

export default WeaponSelector;