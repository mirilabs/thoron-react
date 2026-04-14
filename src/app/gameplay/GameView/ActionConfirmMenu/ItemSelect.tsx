import React, { useState, useEffect } from 'react';
import ItemIcon from '@/app/gameplay/ControlPanel/Items/ItemIcon';
import { Button } from '@mui/material';
import { Command, ItemRecord } from 'thoron';
import { useSelectedUnit } from '../../utils/useUnit';
import {
  useControllerSelector,
  useControllerDispatch
} from '../../utils/reduxHooks';
import { itemSelected } from '@/shared/store';

const ITEM_FILTERS: Partial<{ [K in Command]: ItemRecord["type"] }> = {
  attack: "weapon",
  staff: "staff",
  item: "consumable",
}

function ItemSelect() {
  const unit = useSelectedUnit();
  const selectedItemIndex = useControllerSelector(
    state => state.pendingMove.itemIndex
  );
  const selectedItem = unit?.items?.[selectedItemIndex];
  const dispatch = useControllerDispatch();
  const actionType = useControllerSelector(state => state.pendingMove.action);

  const handleItemSelect = (item: ItemRecord) => {
    dispatch(itemSelected(unit.items.indexOf(item)));
  };

  const [filteredItems, setFilteredItems] = useState<ItemRecord[]>([]);

  React.useEffect(() => {
    if (!unit) {
      return;
    }
    if (!actionType) {
      return;
    }

    let items: ItemRecord[] = unit.items;
    if (ITEM_FILTERS[actionType]) {
      items = items.filter(item => item.type === ITEM_FILTERS[actionType]);
    }

    // update list of items matching current action type
    setFilteredItems(items);

    // select default item
    if (items.length > 0) {
      handleItemSelect(items[0]);
    }
  }, [actionType, unit]);

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
      </div>
    </>
  );
}

export default ItemSelect;