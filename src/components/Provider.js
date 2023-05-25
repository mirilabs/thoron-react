import React from 'react';
import { ThoronContext } from "../utils/ThoronContext";

function Provider({ chapter, children }) {
  return (
    <ThoronContext.Provider value={chapter}>
      {children}
    </ThoronContext.Provider>
  )
}

export default Provider