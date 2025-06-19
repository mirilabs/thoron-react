import "./ItemDetail";
import React from "react";
import { ItemRecord } from "thoron";
import ItemIcon from "./ItemIcon";

interface ItemDetailProps {
  record: ItemRecord;
}

function ItemDetail({ record }: ItemDetailProps) {
  const {
    name,
    description,
    uses,
  } = record;

  return (
    <div className="item-detail">
      <ItemIcon item={record} />
      <div className="item-detail__name">
        {name}
      </div>
      <div className="item-detail__description">
        {description}
      </div>
    </div>
  )
}

export default ItemDetail;