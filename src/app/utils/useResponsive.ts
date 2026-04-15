import { useContext } from 'react';
import ViewportContext, { WindowSize } from '../gameplay/ViewportContext';

function useResponsive(): [WindowSize, typeof WindowSize] {
  let size: WindowSize = useContext(ViewportContext) as WindowSize;
  return [size, WindowSize]
}

export default useResponsive;