import * as React from "react";
import classNames from "classnames";

export interface PageWrapperProps {
  className?: string;
  maxWidth?: "7xl" | "md" | "lg";
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className,
  maxWidth,
}) => {
  return (
    <div
      className={classNames(
        "mx-auto min-h-full py-6 px-4 sm:px-6 md:px-8",
        {
          "max-w-7xl": maxWidth === "7xl",
          "max-w-screen-md": maxWidth === "md",
          "max-w-screen-lg": maxWidth === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
