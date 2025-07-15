import "./ItemDetail.scss";
import React from "react";
import { ItemRecord } from "thoron";
import ItemIcon from "./ItemIcon";

interface ItemDetailProps {
  record: ItemRecord;
}

function ItemDetail({ record }: ItemDetailProps) {
  const {
    description,
    uses,
    maxUses,
    type,
  } = record;

  return (
    <>
      <div className="item-detail">
        <p className="description">{description}</p>

      </div>
    </>
  )
}

export default ItemDetail;