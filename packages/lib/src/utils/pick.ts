export const pick = <T extends object, K extends keyof T>(
  target: T,
  whitelisted: K[],
  defaultValue?: any
) =>
  Object.fromEntries(
    whitelisted.map((key) => [key, key in target ? target[key] : defaultValue])
  );
