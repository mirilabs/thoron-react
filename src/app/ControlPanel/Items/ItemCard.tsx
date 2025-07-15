import "./ItemCard.scss";
import React, { useState } from "react";
import ItemDetail from "./ItemDetail";
import { ItemRecord } from "thoron";
import ItemTitle from "./ItemTitle";

function ItemCard({ item, showDetailOnClick, ...props }: {
  item: ItemRecord;
  showDetailOnClick?: boolean;
  [key: string]: any;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => { setShowDetail(!showDetail) }

  return (
    <div className="item-card" onClick={toggleDetail} {...props}>
      <ItemTitle item={item} />
      {
        showDetail && <ItemDetail record={item} />
      }
    </div>
  )
}

export default ItemCard;