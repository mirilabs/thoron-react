import { MutableRefObject, useCallback, useEffect } from "react";

function useOutsideClickHandler(
  ref: MutableRefObject<HTMLElement>,
  callback: () => void
) {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, handleClickOutside]);
}

export default useOutsideClickHandler;