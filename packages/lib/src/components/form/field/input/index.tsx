import * as React from "react";
import classNames from "classnames";
import { SearchIcon } from "@heroicons/react/solid";

import { SizeType } from "../../../../types/commonComponents";
import { Spin } from "../../../spin";

import { validator, ValidatorSchema } from "../../validator";
import type { FieldBaseProps, FieldValidate } from "../../types";
import { getSize } from "../utils";
import { omit } from "../../../..";

interface BaseProps<T>
  extends FieldBaseProps,
    Omit<React.InputHTMLAttributes<T>, "size" | "children" | "onReset"> {}

export interface InputBaseProps extends BaseProps<HTMLInputElement> {
  size?: SizeType;
  loading?: boolean;
}

export interface TextareaProps extends BaseProps<HTMLTextAreaElement> {
  size?: SizeType;
  settings?: InputStringSettings;
  value?: string;
}
export interface InputStringSettings {
  min_symbols?: number;
  max_symbols?: number;
  acceptable_symbols?: string;
  unacceptable_symbols?: string;
}

export interface InputNumberSettings {
  min?: number;
  max?: number;
}
export interface InputStringProps extends InputBaseProps {
  value?: string;
  settings?: InputStringSettings;
}

export interface InputNumberProps extends Omit<InputBaseProps, "onChange"> {
  value?: number;
  onChange?: (v: number | undefined) => void;
  settings?: InputNumberSettings;
}

const Input: React.FC<InputBaseProps> = ({
  placeholder,
  size = "md",
  className,
  value = "",
  ...rest
}) => {
  return (
    <input
      {...omit(rest, "settings", "instance", "children")}
      value={value}
      placeholder={placeholder}
      className={classNames(
        `block w-full appearance-none rounded-md border
         border-gray-300 placeholder-gray-400 shadow-sm
         focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`,
        getSize(size),
        className
      )}
    />
  );
};

export const Text: React.FC<InputStringProps> = (rest) => (
  <>
    <Input {...rest} type="text" />
    {rest.settings?.max_symbols && (
      <div className="mt-1 text-sm text-gray-400">
        {rest?.value?.length || 0} / {rest.settings.max_symbols}
      </div>
    )}
  </>
);
export const Password: React.FC<InputStringProps> = (rest) => (
  <Input {...rest} type="password" />
);
export const Email: React.FC<InputStringProps> = (rest) => (
  <Input {...rest} type="email" />
);
export const InputNumber: React.FC<InputNumberProps> = ({
  onChange,
  value = "",
  ...rest
}) => (
  <Input
    {...rest}
    value={value}
    onChange={(event) => {
      onChange?.(Number(event.target.value) || undefined);
    }}
    type="number"
  />
);

export const Search: React.FC<InputStringProps> = ({
  className,
  loading,
  ...rest
}) => {
  return (
    <div className="relative flex-grow focus-within:z-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {loading ? (
          <Spin className="h-5 w-5 text-gray-400" animate />
        ) : (
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        )}
      </div>
      <Input
        {...rest}
        type="search"
        className={classNames("rounded-none rounded-l-md pl-10", className)}
      />
    </div>
  );
};

export const TextArea: React.FC<TextareaProps> = ({
  size = "md",
  settings,
  className,
  ...rest
}) => {
  return (
    <>
      <textarea
        {...omit(rest, "instance", "children")}
        className={classNames(
          `block w-full appearance-none rounded-md border
         border-gray-300 placeholder-gray-400 shadow-sm
         invalid:border-rose-500 invalid:text-rose-600
         focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:invalid:border-rose-500 focus:invalid:ring-rose-500
         disabled:border-slate-200
         disabled:bg-slate-50 disabled:text-slate-500
          disabled:shadow-none sm:text-sm`,
          getSize(size),
          className
        )}
      />
      {settings?.max_symbols && (
        <div className="text-muted mt-1">
          {rest?.value?.length || 0} / {settings.max_symbols}
        </div>
      )}
    </>
  );
};

export const InputValidate: FieldValidate<string> = async (field, value) => {
  const schema: ValidatorSchema = { $$async: true, field: field.label };

  if (!field.required) {
    schema.optional = true;
  } else {
    schema.empty = false;
  }

  /**
   * Currently, you can't throw field names into an error message.
   * Issue on this topic can be found here
   *
   * https://github.com/icebob/fastest-validator/issues/209
   *
   * It is expected that the `label` field will appear
   * in the schema and then everything will be fine
   */

  switch (field.type) {
    case "textarea":
    case "text": {
      schema.type = "string";

      const settings: InputStringSettings = field.settings || {};
      if (settings?.min_symbols) {
        schema.min = settings.min_symbols;
      }
      if (settings?.max_symbols) {
        schema.max = settings.max_symbols;
      }
      if (settings?.unacceptable_symbols) {
        const re = new RegExp(settings.unacceptable_symbols, "gi");
        schema.pattern = re;
      }
      if (settings?.acceptable_symbols) {
        schema.pattern = settings.unacceptable_symbols;
      }
      break;
    }
    case "email": {
      schema.type = "email";
      break;
    }
    case "number": {
      schema.type = "number";

      const settings: InputNumberSettings = field.settings || {};
      if (settings?.min !== undefined) {
        schema.min = settings.min;
      }
      if (settings?.max !== undefined) {
        schema.max = settings.max;
      }
      break;
    }
  }

  if (!schema.type) {
    return;
  }

  const field_name = field.name.join(".");
  const result = await validator.validate(
    {
      [field_name]: value,
    },
    {
      [field_name]: schema,
    }
  );

  if (Array.isArray(result)) {
    for (const error of result) {
      throw error.message;
    }
  }
};

export default {
  Text,
  Password,
  Email,
  Number,
  Search,
};
