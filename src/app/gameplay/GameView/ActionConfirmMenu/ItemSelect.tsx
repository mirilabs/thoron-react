import React, { useState, useEffect } from 'react';
import ItemIcon from '@/app/gameplay/ControlPanel/Items/ItemIcon';
import { Button } from '@mui/material';
import { ItemRecord } from 'thoron';
import { useSelectedItem, useSelectedTarget, useSelectedUnit } from '../../utils/useUnit';
import {
  useControllerSelector,
  useControllerDispatch
} from '../../utils/reduxHooks';
import { itemSelected } from '@/shared/store';

function isInRange(range: number, item: ItemRecord) {
  return range >= item.stats.minRange && range <= item.stats.maxRange;
}

function ItemSelect() {
  const unit = useSelectedUnit();
  const target = useSelectedTarget();

  const destination = useControllerSelector(
    state => state.pendingMove.destination
  );
  const range = (target && destination) ?
    target.getDistance(destination) : NaN;

  const selectedItem = useSelectedItem();
  const actionType = useControllerSelector(state => state.pendingMove.action);

  const dispatch = useControllerDispatch();
  const handleItemSelect = (item: ItemRecord) => {
    if (!unit) return;
    const index = unit.items.indexOf(item);
    if (index === -1) return;

    unit.equip(index);
    dispatch(itemSelected(index));
  };

  const [filteredItems, setFilteredItems] = useState<ItemRecord[]>([]);

  useEffect(() => {
    if (!unit) {
      return;
    }
    if (!actionType) {
      return;
    }

    let items: ItemRecord[] = unit.items;
    switch (actionType) {
      case "attack":
        items = items.filter(item => item.type === "weapon")
          .filter(item => isInRange(range, item));
        break;
      case "staff":
        items = items.filter(item => item.type === "staff")
          .filter(item => isInRange(range, item));
        break;
      case "item":
        items = items.filter(item => item.type === "consumable");
        break;
    }

    // update list of items matching current action type
    setFilteredItems(items);
  }, [actionType, unit, target]);

  useEffect(() => {
    if (!unit) return;

    // if currently selected item is not in filtered list, select a default item
    if (!(filteredItems.includes(selectedItem))) {
      const index = unit.items.indexOf(filteredItems[0]);
      dispatch(itemSelected(index));
    }
  }, [filteredItems])

  const itemElems = filteredItems
    .map((item, index) => {
      const isSelected = selectedItem === item;
      return (
        <Button
          key={index}
          variant={isSelected ? "contained" : "outlined"}
          onClick={() => { handleItemSelect(item) }}
        >
          {item.name}
        </Button>
      )
    });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between mb-4">
        <span className="text-xl font-bold">{unit?.record.name}</span>
        <div className="flex flex-row gap-2 items-center">
          <ItemIcon item={selectedItem} />
          <span className="text-lg">{selectedItem?.name || "None"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {itemElems}
        {itemElems.length === 0 && <p>No valid items</p>}
      </div>
    </>
  );
}

export default ItemSelect;