import classNames from "classnames";
import * as React from "react";

import { Spin } from "../spin";

export type PreloaderProps = {
  small?: boolean;
  fullScreenHeight?: boolean;
  fullContainerHeight?: boolean;
  className?: string;
};

export const Preloader: React.FC<PreloaderProps> = ({
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
