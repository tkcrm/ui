import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import * as React from "react";

type AlertType = "error" | "warning" | "success" | "info";

export interface AlertProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "title"> {
  type: AlertType;
  title?: string;
  text?: string;
}

type ComponentStyleParams = {
  bg: string;
  icon_color: string;
  icon: any;
  title_color: string;
  text_color: string;
};

const getParams = (type: AlertType): ComponentStyleParams => {
  const params: Record<AlertType, ComponentStyleParams> = {
    error: {
      bg: "bg-red-50",
      icon_color: "text-red-400",
      title_color: "text-red-800",
      text_color: "text-red-700",
      icon: XCircleIcon,
    },
    warning: {
      bg: "bg-yellow-50",
      icon_color: "text-yellow-400",
      title_color: "text-yellow-800",
      text_color: "text-yellow-700",
      icon: ExclamationTriangleIcon,
    },
    info: {
      bg: "bg-blue-50",
      icon_color: "text-blue-400",
      title_color: "text-blue-800",
      text_color: "text-blue-700",
      icon: InformationCircleIcon,
    },
    success: {
      bg: "bg-green-50",
      icon_color: "text-green-400",
      title_color: "text-green-800",
      text_color: "text-green-700",
      icon: CheckCircleIcon,
    },
  };

  return params[type];
};

export const Alert: React.FC<AlertProps> = ({ title, text, type }) => {
  const params = getParams(type);

  return (
    <div
      className={classNames(
        "flex items-center rounded-md py-3 px-4 text-sm",
        params.bg
      )}
    >
      <div className={classNames("flex-shrink-0", params.icon_color)}>
        <params.icon className="h-5 w-5" />
      </div>
      <div className={classNames("ml-3", params.title_color)}>
        {title && (
          <h3 className={classNames("mb-1 font-medium", params.text_color)}>
            {title}
          </h3>
        )}
        {text}
      </div>
    </div>
  );
};
