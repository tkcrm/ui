import * as React from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import { SizeType } from "../../../../types/commonComponents";
import { getSize } from "../utils";

import weekOfYear from "dayjs/plugin/weekOfYear";
import { FieldBaseProps, omit } from "../../../..";
dayjs.extend(weekOfYear);

type ComponentTypes = "date" | "datetime-local" | "time" | "month" | "week";

export interface DatetimeSettings {
  placeholder?: string;
  format?: string;
  min?: string;
  max?: string;
  step?: string;
}

export interface DatetimeProps
  extends FieldBaseProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "value" | "onChange" | "children" | "onReset"
    > {
  value?: Date | string;
  onChange?: (value: string | null) => void;
  type: ComponentTypes;
  size?: SizeType;
  className?: string;
  settings?: DatetimeSettings;
}

const getFormat = (type: ComponentTypes): string => {
  const formats: Record<ComponentTypes, string> = {
    date: "YYYY-MM-DD",
    "datetime-local": "YYYY-MM-DDTHH:mm",
    time: "HH:mm",
    month: "MM",
    week: "YYYY-W",
  };

  return formats[type];
};

const getFormatedValue = (
  value: string | Date | undefined,
  type: ComponentTypes
): string => {
  if (!value) return "";
  let formated_value = dayjs(value).format(getFormat(type));
  if (type === "week") {
    formated_value = `${dayjs(value).year()}-W${dayjs(value).week()}`;
  }
  return formated_value;
};

const Datetime: React.FC<DatetimeProps> = ({
  className,
  settings,
  size = "md",
  value,
  onChange,
  ...rest
}) => {
  return (
    <input
      {...omit(rest, "instance", "children")}
      min={settings?.min}
      max={settings?.max}
      step={settings?.step}
      value={getFormatedValue(value, rest.type)}
      className={classNames(
        `block w-full appearance-none rounded-md border
       border-gray-300 placeholder-gray-400 shadow-sm
       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`,
        getSize(size),
        className
      )}
      onChange={(event) => {
        onChange?.(
          event.target.value ? new Date(event.target.value).toISOString() : null
        );
      }}
    />
  );
};

export default Datetime;
