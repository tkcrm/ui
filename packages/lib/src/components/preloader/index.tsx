import classNames from "classnames";
import React from "react";
import { Spin } from "../spin";

type PagePreloaderProps = {
  small?: boolean;
  fullScreenHeight?: boolean;
  fullContainerHeight?: boolean;
  className?: string;
};

export const PagePreloader: React.FC<PagePreloaderProps> = ({
  small,
  fullScreenHeight,
  fullContainerHeight,
  className,
}): JSX.Element => (
  <div
    className={classNames(
      "min-h flex items-center justify-center px-8 py-8",
      {
        "min-h-screen": fullScreenHeight,
        "min-h-full": fullContainerHeight,
      },
      className
    )}
  >
    <Spin
      className={classNames("text-indigo-800", {
        "h-6 w-6": !small,
        "h-5 w-5": small,
      })}
      animate
    />
  </div>
);
