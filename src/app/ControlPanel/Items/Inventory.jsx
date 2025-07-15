import "./Inventory.scss";
import React from "react";
import ItemCard from "./ItemCard";

function ItemSelector({ index, item }) {
  return (
    <div className="item">
      {item.name ?? '???'}
    </div>
  );
}

function InventoryView({ items }) {
  const rows = items.map((item, i) => (
    <ItemCard key={i} item={item} index={i} className="item-card" />
  ));

  return (
    <div className="unit-detail__inventory">
      <div className="title">Items</div>
      {rows}
    </div>
  )
}

export default InventoryView;