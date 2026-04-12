import { useContext } from 'react';
import ViewportContext, { WindowSize } from '../gameplay/ViewportContext';

function useResponsive() {
  let size: number = useContext(ViewportContext) as number;
  return {
    ...WindowSize,
    size: size,
    isSmall: size === WindowSize.SMALL,
    isMedium: size === WindowSize.MEDIUM,
    isLarge: size === WindowSize.LARGE
  };
}

export default useResponsive;
export { WindowSize }