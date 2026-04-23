import React from 'react';
import { ItemRecord } from 'thoron';
import ItemIcon from './ItemIcon';

interface ItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ItemRecord;
}

function ItemTitle({ item, className, ...props }: ItemTitleProps) {
  const hasOnClick = props.onClick !== undefined;
  const classNames = [
    "min-w-[120px] h-[32px] rounded-md bg-[var(--bg-color-2)]",
    "flex flex-row items-center flex-wrap gap-2",
    hasOnClick ? "cursor-pointer" : "cursor-default",
    hasOnClick ? "hover:text-shadow-[0px_0px_3px_var(--text-color)]" : "",
    className
  ].join(" ");

  let { uses, maxUses } = item;
  if (maxUses && uses === undefined) uses = maxUses;

  return (
    <div className={classNames} {...props}>
      <ItemIcon item={item} />
      <h2 className="text-md text-[var(--text-color)] text-shadow-inherit">
        {item.name ?? '???'}
      </h2>
      {
        (maxUses) && (
          <span className="text-sm text-[var(--text-color-2)]">
            {uses} / {maxUses}
          </span>
        )
      }
    </div>
  )
}

export default ItemTitle;