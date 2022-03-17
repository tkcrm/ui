import * as React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { Spin } from "../spin";
import { SizeType } from "../../types/commonComponents";

export type ButtonType = "button" | "link";

export type ButtonStyle =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "info"
  | "white"
  | "transparent";

export interface ButtonProps {
  className?: string;
  size?: SizeType;
  type?: ButtonType;
  to?: string;
  style?: ButtonStyle;
  rounded?: boolean;
  rounded_full?: boolean;
  border?: boolean;
  bold?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const getSize = (size: SizeType): string => {
  const sizes: Record<SizeType, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm leading-4",
    lg: "px-4 py-2 text-base",
    xl: "px-6 py-3 text-base",
  };

  return sizes[size];
};

const getStyle = (style: ButtonStyle): string => {
  const styles: Record<ButtonStyle, string> = {
    primary:
      "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:hover:bg-indigo-600",
    secondary:
      "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500 focus:ring-indigo-500 disabled:hover:bg-indigo-100",
    danger:
      "text-white bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 disabled:hover:bg-rose-600",
    success:
      "text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:ring-emerald-500 focus:ring-emerald-500 disabled:hover:bg-emerald-100",
    info: "text-sky-700 bg-sky-100 hover:bg-sky-200 focus:ring-sky-500 focus:ring-sky-500 disabled:hover:bg-sky-100",
    white:
      "text-gray-700 border-gray-300 bg-white hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-white",
    transparent: "text-gray-700",
  };
  return styles[style];
};

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  type = "button",
  style = "primary",
  children,
  ...rest
}) => {
  if (type == "link") {
    return (
      <Link
        to={rest.to as string}
        className={classNames(
          "inline-flex items-center focus:outline-none disabled:opacity-75",
          "transition duration-100 ease-in",
          getStyle(style),
          {
            "rounded-full": rest.rounded_full,
            "rounded-md": rest.rounded && size != "sm",
            rounded: rest.rounded && size === "sm",
            "border-transparent": !rest.border,
            "font-medium": rest.bold,
            "border shadow-sm focus:ring-2 focus:ring-offset-2":
              style !== "transparent",
            [getSize(size)]: style !== "transparent",
          },
          rest.className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={rest.disabled || rest.loading}
      className={classNames(
        "inline-flex items-center focus:outline-none disabled:opacity-75",
        "transition duration-200 ease-in-out",
        getStyle(style),
        {
          "rounded-full": rest.rounded_full,
          "rounded-md": rest.rounded && size != "sm",
          rounded: rest.rounded && size === "sm",
          "cursor-not-allowed": rest.disabled || rest.loading,
          "border-transparent": !rest.border,
          "font-medium": rest.bold,
          "border shadow-sm focus:ring-2 focus:ring-offset-2":
            style !== "transparent",
          [getSize(size)]: style !== "transparent",
        },
        rest.className
      )}
      onClick={rest.onClick}
    >
      {rest.loading && <Spin className="-ml-1 mr-3 h-5 w-5" animate />}
      {children}
    </button>
  );
};
