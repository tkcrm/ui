import React from "react";
import { Link as RLink, LinkProps } from "react-router-dom";
import classNames from "classnames";

export const Link: React.FC<{ to: string } & LinkProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <RLink
      {...rest}
      className={classNames(
        "font-medium text-indigo-600 hover:text-indigo-900 ",
        className
      )}
    >
      {children}
    </RLink>
  );
};
