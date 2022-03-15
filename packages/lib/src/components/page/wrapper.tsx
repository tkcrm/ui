import React from "react";
import classNames from "classnames";

type PageWrapperProps = {
  className?: string;
  max_width?: "7xl" | "md" | "lg";
};

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className,
  max_width,
}) => {
  return (
    <div
      className={classNames(
        "mx-auto min-h-full py-6 px-4 sm:px-6 md:px-8",
        {
          "max-w-7xl": max_width === "7xl",
          "max-w-screen-md": max_width === "md",
          "max-w-screen-lg": max_width === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
