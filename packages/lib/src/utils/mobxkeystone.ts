import { getSnapshot } from "mobx-keystone";

type RemoveKeystoneIdsResult<T> = Omit<T, "$modelType">;

/**
 * removeKeystoneIds clears the snapshot of `$modelType` fields
 *
 * This function is needed when sending data to the back, as it swears at these extra fields
 *
 * @param obj any serializable object of the mobx-keystone class bean
 * @returns changed object
 */
export const removeKeystoneIds = <T extends Record<string, any>>(
  obj: T
): RemoveKeystoneIdsResult<T> => {
  const result = removeKeystoneIdsProcess(getSnapshot(obj));
  return JSON.parse(JSON.stringify(result));
};

const removeKeystoneIdsProcess = <T extends Record<string, any>>(
  obj: T
): RemoveKeystoneIdsResult<T> => {
  for (const propertyName in obj) {
    if (propertyName === "$modelType") {
      delete obj[propertyName];
    }
    if (Array.isArray(obj[propertyName])) {
      obj[propertyName] = obj[propertyName].map((element: any) =>
        removeKeystoneIdsProcess(element)
      );
    }
    if (obj[propertyName] !== null && typeof obj[propertyName] === "object") {
      (obj[propertyName] as Record<string, any>) = removeKeystoneIdsProcess(
        obj[propertyName]
      );
    }
    if (typeof obj[propertyName] === "bigint") {
      obj[propertyName] = obj[propertyName].toString();
    }
  }
  return obj;
};
