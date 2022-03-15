import { Draft, AnyModel } from "mobx-keystone";
import type { FieldProps as RCFieldProps } from "rc-field-form/lib/Field";
import type { FormInstance, FormProps as RCFormProps } from "rc-field-form";
import type { ButtonParameters } from "../button";

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

export interface SaveButtonProps extends ButtonParameters {
  draft?: FormDraft<any>;
  hideOnNotDirty?: boolean;
  className?: string;
  onSave?: () => Promise<void>;
}

export interface ResetButtonProps extends ButtonParameters {
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
   * Используем миксины, когда у нас одна и та же
   * логика для обновления полей
   */
  dependenciesMixin?: DependenciesMixin[];
  /**
   * Используем это, когда нам нужно кастомное решение
   * для обновления полей
   */
  dependenciesFieldsToUpdate?: DependenciesFieldsToUpdate[];
}

//export type MixinNames = "slug";
export type MixinNames = any;

export type MixinCallback = (
  /**
   * Новое значение
   */
  value: any,
  /**
   * Текущее значение в зависимом поле
   */
  currentValue?: any,
  draft?: FormDraft<any>
) => any;
export interface DependenciesMixin {
  /**
   * Массив с `path` к полям, которые хотим обновить
   */
  fieldNames: FieldNamePath[];
  /**
   * Название нашего миксина
   */
  name: MixinNames;
}

export interface DependenciesFieldsToUpdate {
  /**
   * Массив с `path` к полям, которые хотим обновить
   */
  fieldNames: FieldNamePath[];
  callback: (
    /**
     * Новое значение
     */
    value: any,
    /**
     * Текущее значение в зависимом поле
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
