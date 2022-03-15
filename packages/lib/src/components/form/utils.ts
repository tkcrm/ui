import { getSnapshot, applySnapshot } from "mobx-keystone";
import { Rule } from "rc-field-form/lib/interface";
import isEqual from "lodash/isEqual";
import set from "lodash/set";

import {
  FormGroupProps,
  FieldData,
  ChangeDraftFieldsParameters,
  FieldNamePath,
} from "./types";
import { field_validations } from "./field_extensions";

/**
 * Возвращает строку, где первая буква будет заглавной
 *
 * @param string Строка
 * @returns
 */
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const findFieldInGroups = (
  groups: FormGroupProps[],
  field_name: FieldNamePath
): FieldData | undefined => {
  for (const group of groups) {
    for (const field of group.fields) {
      if (isEqual(field.name, field_name)) {
        return field;
      }
    }
  }
  return undefined;
};

export const getValidateRules = (field: FieldData): Rule[] => {
  const validate_rules: Rule[] = [];
  const field_validator = field_validations[field.type];
  if (field_validator) {
    validate_rules.push({
      validator: (_, value) => field_validator(field, value),
    });
  }

  return validate_rules;
};

export const getFieldsFromGroups = (groups: FormGroupProps[]): FieldData[] => {
  const fields: FieldData[] = [];
  for (const group of groups) {
    for (const field of group.fields) {
      fields.push(field);
    }
  }

  return fields;
};

export const changeDraftFields: ChangeDraftFieldsParameters = (
  draft,
  fields_to_update
) => {
  try {
    const snapshot = getSnapshot(draft.data);
    for (const { name, value } of fields_to_update) {
      set(snapshot, name, value);
    }

    draft.form?.setFields(
      fields_to_update.map(({ name, value }) => ({ name, value }))
    );

    applySnapshot(draft.data, snapshot);
  } catch (error: any) {
    console.error(
      `${fields_to_update?.[0]?.name} error\n\n${error.message}`,
      `\n\nwith value:\n${JSON.stringify(
        fields_to_update?.[0]?.value,
        null,
        2
      )}`
    );
  }
};

export const getColSizeStyle = (col_size: number): string | undefined => {
  const sizes: Record<number, string> = {
    1: "sm:col-span-1",
    2: "sm:col-span-2",
    3: "sm:col-span-3",
    4: "sm:col-span-4",
    5: "sm:col-span-5",
    6: "sm:col-span-6",
    7: "sm:col-span-7",
    8: "sm:col-span-8",
    9: "sm:col-span-9",
    10: "sm:col-span-10",
    11: "sm:col-span-11",
    12: "sm:col-span-12",
  };

  return sizes[col_size];
};
