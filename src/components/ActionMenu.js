import React, { useState, useContext } from "react";
import ThoronContext from "./ThoronContext";
import useSelectedUnit from "./utils/useSelectedUnit";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ActionButton(action, uiEvents) {
  return (
    <button onClick={() => { uiEvents.emit('select_action', action) }}>
      {capitalize(action)}
    </button>
  )
}

function ActionMenu({ render }) {
  const { chapter, uiEvents } = useContext(ThoronContext);
  const [options, setOptions] = useState(null);

  const selectedUnit = useSelectedUnit();

  const buttons = [
    'attack',
    'wait'
  ]
    .map(action => ActionButton(action, uiEvents));

  if (render) {
    return render({

    });
  }
  else return (
    <div>
      {buttons}
    </div>
  );
}

export default ActionMenu;