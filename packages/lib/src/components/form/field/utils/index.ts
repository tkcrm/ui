import { SizeType } from "../../../../types/commonComponents";

export const getSize = (size: SizeType): string => {
  const sizes: Record<SizeType, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-base",
    xl: "px-6 py-3 text-base",
  };

  return sizes[size];
};
