import { useContext } from 'react';
import ViewportContext, { WindowSize } from '../ViewportContext';

function useResponsive() {
  let size = useContext(ViewportContext);
  return {
    ...WindowSize,
    size: size,
    isSmall: size === WindowSize.SMALL,
    isMedium: size === WindowSize.MEDIUM,
    isLarge: size === WindowSize.LARGE
  };
}

export default useResponsive;
