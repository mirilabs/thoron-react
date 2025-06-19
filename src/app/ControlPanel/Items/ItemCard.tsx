import "./ItemCard.scss";
import React, { useState } from "react";
import ItemIcon from "./ItemIcon";
import ItemDetail from "./ItemDetail";

function ItemShow({ item, ...props }) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => { setShowDetail(!showDetail) }

  return (
    <div className="item-card" onClick={toggleDetail} {...props}>
      <ItemIcon item={item} />
      <h2>{item.name ?? '???'}</h2>
      {
        showDetail && <ItemDetail item={item} />
      }
    </div>
  )
}

export default ItemShow;