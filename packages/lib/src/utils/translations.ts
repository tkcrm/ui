/**
 * Formats a key value
 *
 * `SomeNamespace:SoMe Good_key` => `somenamespace:some_good_key`
 *
 * @param value what needs to be translated
 * @param namespace namespace
 * @returns formatted text
 */
export const formatTranslationKey = (
  value: string,
  namespace?: string
): string => {
  let result = value.toLocaleLowerCase().replace(/[\s-]/g, "_");
  if (namespace) {
    result = `${namespace}:${result}`;
  }

  return result;
};
