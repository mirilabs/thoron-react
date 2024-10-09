import "./InventoryView.scss";

function ItemSelector({ index, item }) {
  return (
    <div className="item">
      {item.name ?? '???'}
    </div>
  );
}

function InventoryView({ items }) {
  const rows = items.map((item, i) => (
    <ItemSelector index={i} item={item} key={i} />
  ));

  return (
    <div className="unit-detail__inventory">
      <div className="title">Items</div>
      {rows}
    </div>
  )
}

export default InventoryView;