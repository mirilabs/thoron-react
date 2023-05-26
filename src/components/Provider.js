import React, { useState } from 'react';
import { ThoronContext } from "../utils/ThoronContext";

function Provider({ chapter, children }) {
  let [canvas, setCanvas] = useState(null);

  let defaultValue = {
    chapter,
    canvas,
    setCanvas
  }

  return (
    <ThoronContext.Provider value={defaultValue}>
      {children}
    </ThoronContext.Provider>
  )
}

export default Provider