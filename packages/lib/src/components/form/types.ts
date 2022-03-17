import type { Draft, AnyModel } from "mobx-keystone";
import type { FieldProps as RCFieldProps } from "rc-field-form/lib/Field";
import type { FormInstance, FormProps as RCFormProps } from "rc-field-form";
import type { ButtonProps } from "../button";

export interface FormDraft<T extends Record<any, any>> extends Draft<T> {
  form?: FormInstance;
  fields?: FieldData[];
  changeFields?: (fieldsToUpdate: FieldsToUpdate[]) => void;
}

export interface FormProps extends RCFormProps {
  draft: FormDraft<any>;
  model: AnyModel;
  groups: FormGroupProps[];
  onSubmit?: () => Promise<void>;
  debug?: boolean;
}

export interface SaveButtonProps extends ButtonProps {
  draft?: FormDraft<any>;
  hideOnNotDirty?: boolean;
  className?: string;
  onSave?: () => Promise<void>;
}

export interface ResetButtonProps extends ButtonProps {
  draft?: FormDraft<any>;
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
  name?: FieldNamePath;
  model?: AnyModel;
  draft?: FormDraft<any>;
}

export type FieldValidate<T> = (
  field: FieldData,
  value: T
) => Promise<void | any> | void;

export interface FieldData extends FieldBaseProps {
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
  draft?: FormDraft<any>
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
    draft: FormDraft<any>
  ) => any;
}

export interface FieldsToUpdate {
  name: FieldNamePath;
  value: any;
}

export type ChangeDraftFieldsParameters = (
  draft: FormDraft<any>,
  fieldsToUpdate: FieldsToUpdate[]
) => void;
