import React, { useState } from "react";
import ItemDetail from "./ItemDetail";
import { ItemRecord } from "thoron";
import ItemTitle from "./ItemTitle";

function ItemCard({
  item,
  showDetailOnClick = true,
  ...props
}: {
  item: ItemRecord;
  showDetailOnClick?: boolean;
  [key: string]: any;
}) {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = showDetailOnClick ?
    () => { setShowDetail(!showDetail) } :
    undefined;

  return (
    <div
      className={
        "bg-[var(--bg-color-2)] p-4 rounded-md max-w-[384px]" +
        (showDetailOnClick ? " cursor-pointer" : "")
      }
      {...props}
    >
      <ItemTitle item={item} onClick={toggleDetail} />
      {showDetail && <ItemDetail record={item} />}
    </div>
  )
}

export default ItemCard;