import { useState, useEffect } from "react";

export default function useBlobUrl(blob: Blob | undefined | null) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!blob) {
      setUrl("");
      return;
    }

    const newUrl = URL.createObjectURL(blob);
    setUrl(newUrl);

    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [blob]);

  return url;
}
