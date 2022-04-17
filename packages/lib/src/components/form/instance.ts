import { isEqual, merge, set } from "lodash";
import {
  action,
  IObservableValue,
  makeAutoObservable,
  observable,
  toJS,
} from "mobx";
import type { FormInstance as RCFormInstance } from "rc-field-form";
import { get } from "../..";

import {
  FormGroupProps,
  FormInstanceParameters,
  FormSettings,
  GetFormInstanceParameters,
} from "./types";
import { getFieldsFromGroups } from "./utils";

export class FormInstance {
  constructor({ groups, initialValues, settings }: FormInstanceParameters) {
    makeAutoObservable(this);
    this.settings = settings || {};
    this.groups = groups;
    this.setInitialValues(initialValues || {});
    this.validatingFields = new Map();
  }

  private dirty: IObservableValue<boolean> = observable.box(false);
  private validating: IObservableValue<boolean> = observable.box(false);
  private loading: IObservableValue<boolean> = observable.box(false);

  form: RCFormInstance<any> | undefined;
  groups: FormGroupProps[];
  initialValues: Record<string, any> = {};
  tempValues: Record<string, any> = {};
  settings: FormSettings;

  validatingFields: Map<string, any>;

  setForm(form: RCFormInstance<any>, defaultFormSettings: FormSettings) {
    this.form = form;
    this.settings = merge(defaultFormSettings, this.settings);
    this.setTempValues(this.getInitialValues);
    form.setFields(getFieldsFromGroups(this.groups));
    form.setFieldsValue(this.getInitialValues);
  }

  clearForm() {
    this.form = undefined;
    this.settings = {};
    this.setInitialValues({});
    this.setTempValues({});
  }

  @action
  saveForm() {
    this.setIsDirty(false);
    this.setInitialValues(this.form?.getFieldsValue());
  }

  @action
  resetForm() {
    this.form?.setFields(getFieldsFromGroups(this.groups));

    const values: Record<string, any> = {};
    for (const key in this.form?.getFieldsValue() || {}) {
      values[key] = this.getInitialValues[key];
    }

    this.form?.setFieldsValue(values);
    this.setTempValues(values);
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
  setInitialValues(v: Record<string, any>) {
    const paths = toJS(this.groups).flatMap((group) =>
      group.fields.map((field) => field.name)
    );

    if (this.settings.debug) {
      console.log("initial field names:", paths);
    }

    const result_values: Record<string, any> = {};
    for (const path of paths) {
      set(result_values, path, get(v, path));
    }

    this.initialValues = result_values;
  }

  get getInitialValues() {
    return toJS(this.initialValues);
  }

  /**
   * update initial values and rc form values
   * @param v
   */
  @action
  updateFormValues(v: Record<string, any>) {
    this.setInitialValues(v);
    this.form?.setFieldsValue(this.getInitialValues);
  }

  /**
   * setTempValues
   *
   * @param v
   */
  @action
  setTempValues(v: Record<string, any>) {
    this.tempValues = v;
  }

  get getTempValues() {
    return toJS(this.tempValues);
  }

  /**
   * return is equal two objects
   */
  isEqual(value: any, other: any): boolean {
    return isEqual(value, other);
  }
}

export const getFormInstance: GetFormInstanceParameters = (
  groups,
  initialValues,
  settings
): FormInstance => {
  const form_instance = new FormInstance({
    initialValues,
    groups,
    settings,
  });
  return form_instance;
};
