import "./ItemShow.scss";
import React from "react";
import ItemIcon from "./ItemIcon";
import { ItemRecord } from "thoron";

type ItemShowProps = {
  item: ItemRecord;
  equippable?: boolean;
} & React.HTMLProps<HTMLDivElement>;

function ItemShow({ item, equippable, ...props }: ItemShowProps) {
  const className = equippable ? "item-show equippable" : "item-show";
  return (
    <div className={className} {...props}>
      <ItemIcon item={item} />
      <h2>{item.name ?? '???'}</h2>
    </div>
  )
}

export default ItemShow;