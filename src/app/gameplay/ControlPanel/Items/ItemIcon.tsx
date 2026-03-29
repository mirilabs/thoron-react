import "./ItemIcon.scss";
import React from "react";
import icons from "@/icons/items";

function ItemIcon({ item }) {
  if (!item) return null;
  
  let iconId = (item.type === "weapon") ?
    item.stats.weaponType :
    item.type;

  return (
    <img className="item-icon"
      src={icons[iconId] ?? icons["unknown"]}
      alt={item.type} />
  )
}

export default ItemIcon;