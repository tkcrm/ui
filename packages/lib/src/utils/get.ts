import { set } from "lodash";
import { isObservable } from "mobx";
import { applySnapshot, getSnapshot } from "mobx-keystone";

import { FieldNamePath } from "../components/form/types";

export type GetParameters = (
  value: Record<string, any>,
  path: FieldNamePath,
  defaultValue?: any
) => any;

export const get: GetParameters = (value, path, defaultValue) => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return path.reduce((acc, v) => {
    try {
      acc = acc[v] !== undefined && acc[v] !== null ? acc[v] : defaultValue;
    } catch {
      return defaultValue;
    }
    if (!isObservable(acc) && defaultValue !== undefined) {
      const sn = getSnapshot(value);
      set(sn, path, defaultValue);
      applySnapshot(value, sn);
      return get(value, path, defaultValue);
    }
    return acc;
  }, value);
};
