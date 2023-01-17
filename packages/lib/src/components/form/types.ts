import type { FormProps as RCFormProps } from "rc-field-form";
import type { FieldProps as RCFieldProps } from "rc-field-form/lib/Field";
import React from "react";
import type { ButtonProps } from "../button";
import type { FormInstance } from "./instance";

export interface FormSettings {
  debug?: boolean;
  hidePlaceholders?: boolean;
  texts?: Record<string, string>;
}

export interface FormInstanceParameters {
  groups: FormGroupProps[];
  initialValues?: Record<string, any>;
  settings?: FormSettings;
}

export type GetFormInstanceParameters = (
  groups: FormGroupProps[],
  initialValues?: Record<string, any>,
  settings?: FormSettings
) => FormInstance;

export interface FormProps extends Omit<RCFormProps, "onChange"> {
  instance: FormInstance;
  onSubmit?: () => Promise<void>;
  onChange?: (fields: FieldsToUpdate[]) => void;
}

export interface IForm extends React.FC<FormProps> {
  Save: React.FC<SaveButtonProps>;
  Reset: React.FC<ResetButtonProps>;
}

export interface SaveButtonProps extends ButtonProps {
  instance: FormInstance;
  hideOnNotDirty?: boolean;
  className?: string;
  onSave?: (values: Record<string, any>) => Promise<void>;
}

export interface ResetButtonProps extends ButtonProps {
  instance: FormInstance;
  hideOnNotDirty?: boolean;
  className?: string;
  onReset?: () => void;
}

export interface FormGroupProps {
  title?: string;
  description?: string;
  fields: FieldData[];
}

export declare type FieldTypes =
  | "number"
  | "text"
  | "textarea"
  | "password"
  | "email"
  | "switch"
  | "datetime"
  | "time"
  | "date"
  | "month"
  | "week";

export type FieldNamePath = (string | number)[];

export interface FieldBaseProps extends RCFieldProps {
  id?: string;
  name?: string;
  instance?: FormInstance;
  settings?: Record<string, any>;
}

export type FieldValidate<T> = (
  field: FieldData,
  value: T
) => Promise<void | any> | void;

export interface FieldData extends Omit<FieldBaseProps, "name"> {
  name: FieldNamePath;
  label: string | React.ReactNode;
  type: FieldTypes;
  placeholder?: string;
  required?: boolean;
  hidden?: boolean;
  value?: any;
  touched?: boolean;
  validating?: boolean;
  colSize: number;
  order?: number;
  settings?: Record<string, any>;
  /**
   * Use mixins when we have the same logic to update fields
   */
  dependenciesMixin?: DependenciesMixin[];
  /**
   * Use this when we need a custom solution to update fields
   */
  dependenciesFieldsToUpdate?: DependenciesFieldsToUpdate[];
}

//export type MixinNames = "slug";
export type MixinNames = any;

export type MixinCallback = (
  /**
   * New value
   */
  value: any,
  /**
   * Current value in dependent field
   */
  currentValue?: any,
  instance?: FormInstance
) => any;
export interface DependenciesMixin {
  /**
   * Array with `path` to the fields we want to update
   */
  fieldNames: FieldNamePath[];
  /**
   * Mixin name
   */
  name: MixinNames;
}

export interface DependenciesFieldsToUpdate {
  /**
   * Array with `path` to the fields we want to update
   */
  fieldNames: FieldNamePath[];
  callback: (
    /**
     * New value
     */
    value: any,
    /**
     * Current value in dependent field
     */
    currentValue: any,
    instance: FormInstance
  ) => any;
}

export interface FieldsToUpdate {
  name: FieldNamePath;
  value: any;
}

export type UpdateMobxKeystoneModelFieldsParameters = (
  draft: any,
  fieldsToUpdate: Record<string, any>
) => void;
