import { ValidationSchema } from "fastest-validator";
import FastestValidator from "fastest-validator";

export type ValidatorSchema = ValidationSchema;
export const validator = new FastestValidator({
  useNewCustomCheckerFunction: true,
});
