import { useUIEmitter } from "components/utils/useUIAction";
import "./InventoryView.scss";

function ItemSelector({ index, item }) {
  const setEquipped = useUIEmitter('set_equipped_index', index);
  
  return (
    <div className="item" onClick={setEquipped}>
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