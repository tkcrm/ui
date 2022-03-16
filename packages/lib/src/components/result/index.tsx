import * as React from "react";
import classNames from "classnames";
import {
  ExclamationIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";

export type ResultType = "primary" | "info" | "success" | "error";

export interface ResultProps {
  type: ResultType;
  title: string;
  sub_title?: string;
  extra?: React.ReactNode;
}

const getIconByType = (type: ResultType): JSX.Element => {
  const styles: Record<ResultType, { res_class: string; Icon: any }> = {
    primary: {
      res_class: "text-indigo-700",
      Icon: InformationCircleIcon,
    },
    info: {
      res_class: "text-cyan-700",
      Icon: InformationCircleIcon,
    },
    success: {
      res_class: "text-emerald-700",
      Icon: CheckCircleIcon,
    },
    error: {
      res_class: "text-gray-400",
      Icon: ExclamationIcon,
    },
  };

  return (
    <div className={classNames("h-10 w-10", styles[type].res_class)}>
      {React.createElement(styles[type].Icon)}
    </div>
  );
};

const Result: React.FC<ResultProps> = ({ type, title, sub_title, extra }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {getIconByType(type)}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      {sub_title && <p className="mt-1 text-sm text-gray-500">{sub_title}</p>}
      {extra && <div className="mt-6">{extra}</div>}
    </div>
  );
};

export default Result;
