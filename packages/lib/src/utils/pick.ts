export const pick = <T extends object, K extends keyof T>(
  whitelisted: K[],
  target: T,
  defaultValue?: any
) =>
  Object.fromEntries(
    whitelisted.map((key) => [key, key in target ? target[key] : defaultValue])
  );
