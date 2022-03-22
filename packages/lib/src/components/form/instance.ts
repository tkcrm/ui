import { isEqual } from "lodash";
import {
  action,
  IObservableValue,
  makeAutoObservable,
  observable,
  toJS,
} from "mobx";
import type { FormInstance as RCFormInstance } from "rc-field-form";

import {
  FormGroupProps,
  FormInstanceParameters,
  GetFormInstanceParameters,
} from "./types";
import { getFieldsFromGroups } from "./utils";
import { FormMessages } from "./messages";

export class FormInstance {
  constructor({ groups, initialValues, options }: FormInstanceParameters) {
    makeAutoObservable(this);
    this.groups = groups;
    this.initialValues = initialValues;
    this.validatingFields = new Map();

    this.formMessages = { ...FormMessages, ...options?.formMessages };
  }

  private dirty: IObservableValue<boolean> = observable.box(false);
  private validating: IObservableValue<boolean> = observable.box(false);
  private loading: IObservableValue<boolean> = observable.box(false);

  form: RCFormInstance<any> | undefined;
  groups: FormGroupProps[];
  initialValues: Record<string, any>;
  formMessages: Record<string, string>;

  validatingFields: Map<string, any>;

  setForm(form: RCFormInstance<any>) {
    this.form = form;
    form.setFields(getFieldsFromGroups(this.groups));
    form.setFieldsValue(this.getInitialValues);
  }

  @action
  saveForm() {
    this.setIsDirty(false);
    this.setInitalValues(this.form?.getFieldsValue());
  }

  @action
  resetForm() {
    this.form?.setFields(getFieldsFromGroups(this.groups));

    const values: Record<string, any> = {};
    for (const key in this.form?.getFieldsValue() || {}) {
      values[key] = this.getInitialValues[key];
    }

    this.form?.setFieldsValue(values);
    this.setIsDirty(false);
  }

  /**
   * isDirty
   */
  get isDirty() {
    return this.dirty.get();
  }

  @action
  setIsDirty(v: boolean) {
    this.dirty.set(v);
  }

  /**
   * isValidating
   */
  get isValidating() {
    return this.validating.get();
  }

  @action
  setIsValidating(v: boolean) {
    this.validating.set(v);
  }

  /**
   * isLoading
   */
  get isLoading() {
    return this.loading.get();
  }

  @action
  setIsLoading(v: boolean) {
    this.loading.set(v);
  }

  /**
   * setInitalValues
   * @param v
   */
  @action
  setInitalValues(v: Record<string, any>) {
    this.initialValues = v;
  }

  get getInitialValues() {
    return toJS(this.initialValues);
  }

  /**
   * isEqual two objects
   */
  isEqual(value: any, other: any): boolean {
    return isEqual(value, other);
  }
}

export const getFormInstance: GetFormInstanceParameters = (
  groups,
  initialValues,
  options
): FormInstance => {
  delete initialValues["$modelType"];
  const form_instance = new FormInstance({
    initialValues,
    groups,
    options,
  });
  return form_instance;
};
