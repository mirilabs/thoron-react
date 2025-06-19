import "./ItemCard.scss";
import React from "react";
import ItemIcon from "./ItemIcon";

function ItemShow({ item, ...props }) {
  return (
    <div className="item-show" {...props}>
      <ItemIcon item={item} />
      <h2>{item.name ?? '???'}</h2>
    </div>
  )
}

export default ItemShow;