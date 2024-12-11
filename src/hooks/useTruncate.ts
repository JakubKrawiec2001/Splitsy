import { useState, useEffect } from "react";

export const useTruncate = (maxWidth: number, maxLength: number) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < maxWidth);
    };

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();

    return () => window.removeEventListener("resize", updateScreenSize);
  }, [maxWidth]);

  const truncateText = (text: string): string => {
    if (isSmallScreen && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return { truncateText, isSmallScreen };
};
