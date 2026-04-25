import React, { useEffect } from 'react';

enum WindowSize {
  "SMALL",
  "MEDIUM",
  "LARGE",
  "XL",
  "XXL"
}

// Tailwind default breakpoints
// https://tailwindcss.com/docs/responsive-design
const breakpoints: [WindowSize, number][] = [
  [WindowSize.SMALL, 640],
  [WindowSize.MEDIUM, 768],
  [WindowSize.LARGE, 1024],
  [WindowSize.XL, 1280],
  [WindowSize.XXL, 1536]
] as const;

// This React Context passes the current window size.
// https://reactjs.org/docs/context.html
const ViewportContext = React.createContext({});

function getWindowSize(): WindowSize {
  let width = window.innerWidth;

  for (const [size, maxWidth] of breakpoints) {
    if (width < maxWidth)
      return size;
  }

  return WindowSize.XXL;
}

function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [size, setSize] = React.useState<WindowSize>(getWindowSize());

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

  return (
    <ViewportContext.Provider value={size}>
      {children}
    </ViewportContext.Provider>
  );
}

export default ViewportContext;
export {
  ViewportProvider,
  WindowSize,
  breakpoints
}