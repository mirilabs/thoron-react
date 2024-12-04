import "./ItemIcon.scss";
import React from "react";
import icons from "icons/items";

function ItemIcon({ item }) {
  return (
    <img className="item-icon"
      src={icons[item.type] ?? icons["unknown"]}
      alt={item.type} />
  )
}

export default ItemIcon;