import React, { useEffect } from 'react';

const WindowSize = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2
}

const breakpoints = {
  MAX_SMALL: 640,
  MAX_MEDIUM: 1008
}

// This React Context passes the current window size.
// https://reactjs.org/docs/context.html
const ViewportContext = React.createContext({});

function getWindowSize() {
  let width = window.innerWidth;
  if (width < breakpoints.MAX_SMALL) return WindowSize.SMALL;
  if (width < breakpoints.MAX_MEDIUM) return WindowSize.MEDIUM;
  return WindowSize.LARGE;
}

function ViewportProvider(props) {
  const [size, setSize] = React.useState(getWindowSize());

  const handleWindowResize = () => {
    let newSize = getWindowSize();
    setSize(newSize);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return (() => {
      window.removeEventListener('resize', handleWindowResize);
    })
  });

  return(
    <ViewportContext.Provider value={size}>
      {props.children}
    </ViewportContext.Provider>
  );
}

export default ViewportContext;
export {
  ViewportProvider,
  WindowSize
}