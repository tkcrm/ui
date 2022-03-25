import * as React from "react";
import classNames from "classnames";
import { Switch as UISwitch } from "@headlessui/react";

import { FieldBaseProps } from "../../../..";

export interface SwitchProps extends FieldBaseProps {
  className?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
  value = false,
  onChange,
  className,
}) => {
  return (
    <UISwitch
      checked={value}
      onChange={(v: boolean) => onChange?.(v)}
      className={classNames(
        `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2
        border-transparent transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
        {
          "bg-indigo-600": value,
          "bg-gray-200": !value,
        },
        className
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          `pointer-events-none inline-block h-5 w-5 transform rounded-full
          bg-white shadow ring-0 transition duration-200 ease-in-out`,
          {
            "translate-x-5": value,
            "translate-x-0": !value,
          }
        )}
      />
    </UISwitch>
  );
};

export default Switch;
