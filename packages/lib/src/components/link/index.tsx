import classNames from "classnames";
import * as React from "react";
import {
  Link as ReactLink,
  LinkProps as ReactLinkProps,
} from "react-router-dom";

export interface LinkProps extends ReactLinkProps {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ className, children, ...rest }) => {
  return (
    <ReactLink
      {...rest}
      className={classNames(
        "font-medium text-indigo-600 hover:text-indigo-900 ",
        className
      )}
    >
      {children}
    </ReactLink>
  );
};
