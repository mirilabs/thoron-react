import "./ItemTitle.scss";
import React from 'react';
import { ItemRecord } from 'thoron';
import ItemIcon from './ItemIcon';

interface ItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ItemRecord
}

function ItemTitle({ item, ...props }: ItemTitleProps) {
  let { uses, maxUses } = item;
  if (maxUses && uses === undefined) uses = maxUses;

  return (
    <div className="item-title" {...props}>
      <ItemIcon item={item} />
      <h2 className="name">{item.name ?? '???'}</h2>
      {
        (maxUses) && (
          <span className="uses">
            {uses} / {maxUses}
          </span>
        )
      }
    </div>
  )
}

export default ItemTitle;