import React from "react";

import Field from "./field";
import type {
  FieldTypes,
  FieldValidate,
  MixinCallback,
  MixinNames,
} from "./types";
import { InputValidate } from "./field/input";

export const field_types: Record<FieldTypes, JSX.Element> = {
  number: <Field.Input.InputNumber />,
  text: <Field.Input.Text />,
  textarea: <Field.Input.TextArea />,
  password: <Field.Input.Password />,
  email: <Field.Input.Email />,
  switch: <Field.Switch className="mt-2" />,
  datetime: <Field.Datetime type="datetime-local" />,
  date: <Field.Datetime type="date" />,
  time: <Field.Datetime type="time" />,
  month: <Field.Datetime type="month" />,
  week: <Field.Datetime type="week" />,
};

/**
 * Mixins for dependencies fields
 */
export const field_mixins: Record<MixinNames, MixinCallback> = {};

export const DefaultValidate: FieldValidate<any> = async (field, value) => {
  if (field.required && [undefined, null, ""].includes(value)) {
    throw new Error("fill_in_the_field");
  }
};

export const field_validations: Record<FieldTypes, FieldValidate<any> | null> =
  {
    number: InputValidate,
    text: InputValidate,
    textarea: InputValidate,
    password: InputValidate,
    email: InputValidate,
    switch: DefaultValidate,
    date: DefaultValidate,
    datetime: DefaultValidate,
    time: DefaultValidate,
    month: DefaultValidate,
    week: DefaultValidate,
  };
