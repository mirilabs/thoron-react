import "./ItemShow.scss";
import React from "react";
import icons from "icons/items";

function ItemShow({ item, ...props }) {
  return (
    <div className="item-show" {...props}>
      <img src={icons[item.type] ?? icons["unknown"]} alt={item.type} />
      <h2>{item.name ?? '???'}</h2>
    </div>
  )
}

export default ItemShow;