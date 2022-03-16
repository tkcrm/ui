import * as React from "react";
import classNames from "classnames";

export declare type BadgeStyle =
  | "success"
  | "info"
  | "error"
  | "warning"
  | "primary";

export type BadgeProps = {
  type?: BadgeStyle;
  className?: string;
};

const getStyle = (type: BadgeStyle): string => {
  const styles: Record<BadgeStyle, string> = {
    primary: "text-indigo-700 bg-indigo-100",
    error: "text-rose-700 bg-rose-100",
    success: "text-emerald-700 bg-emerald-100",
    info: "text-cyan-700 bg-cyan-100",
    warning: "text-yellow-700 bg-yellow-100",
  };

  return styles[type];
};

const Badge: React.FC<BadgeProps> = ({
  type = "primary",
  className,
  children,
}) => {
  return (
    <span
      className={classNames(
        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
        getStyle(type),
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
