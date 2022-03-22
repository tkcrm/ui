import * as React from "react";
import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import RCForm from "rc-field-form";
import { Transition } from "@headlessui/react";

import {
  IForm,
  SaveButtonProps,
  ResetButtonProps,
  FieldData,
  FieldsToUpdate,
  FieldBaseProps,
} from "./types";
import { field_types, field_mixins } from "./field_extensions";
import { getValidateRules, getColSizeStyle, findFieldInGroups } from "./utils";

import { notification } from "../notification";
import { Alert } from "../alert";
import { Button } from "../button";

const FormField: React.FC<FieldData> = (field) => {
  return (
    <RCForm.Field
      {...field}
      //tooltip={field.settings?.hint}
      rules={getValidateRules(field)}
    >
      {(props, meta) =>
        field_types[field.type] ? (
          <>
            {React.cloneElement(field_types[field.type], {
              ...props,
              id: field.id,
              name: field.id,
              placeholder: field.placeholder || "type_field",
              instance: field.instance,
              className: [
                props?.className,
                meta.errors.length > 0 &&
                  "border-rose-300 text-rose-900 placeholder-rose-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500",
              ]
                .filter(Boolean)
                .join(" "),
              ...(field.settings && {
                settings: {
                  ...field_types[field.type].props.settings,
                  ...field.settings,
                },
              }),
            } as FieldBaseProps)}
            {meta.errors.map((error, index) => (
              <p
                className="mt-2 break-words text-sm text-rose-600"
                key={index.toString()}
              >
                {error}
              </p>
            ))}
          </>
        ) : (
          <Alert
            text={`${field.type} field not implemented yet`}
            type="error"
          />
        )
      }
    </RCForm.Field>
  );
};

export const Form: IForm = ({ instance, debug, onChange, ...props }) => {
  const [form] = RCForm.useForm();
  instance.setForm(form);

  return (
    <RCForm
      {...props}
      autoComplete="off"
      form={form}
      onFieldsChange={(changed_fields) => {
        if (instance.isValidating) {
          return;
        }

        for (const field of changed_fields as FieldData[]) {
          const field_name = field.name.join("-");
          if (!instance.validatingFields.has(field_name)) {
            instance.validatingFields.set(field_name, true);
            return;
          }

          instance.validatingFields.delete(field_name);

          let result_value = field.value;

          if (field.value?.target?.checked !== undefined) {
            result_value = field.value.target.checked;
          }

          const fields_to_update: FieldsToUpdate[] = [
            { name: field.name, value: result_value },
          ];

          /**
           * Update dependent fields with mixins
           */
          const finded_field = findFieldInGroups(instance.groups, field.name);
          if (finded_field?.dependenciesMixin) {
            for (const mixin of finded_field.dependenciesMixin) {
              const mixin_callback = field_mixins[mixin.name];
              if (!mixin_callback) {
                throw new TypeError(`undefined mixin name ${mixin.name}`);
              }

              // Update multiple fields at once
              for (const field_name of mixin.fieldNames) {
                fields_to_update.push({
                  name: field_name,
                  value: mixin_callback(
                    result_value,
                    form.getFieldValue(field_name),
                    instance
                  ),
                });
              }
            }
          }

          /**
           * Update dependent fields with custom implementations
           */
          if (finded_field?.dependenciesFieldsToUpdate) {
            for (const field_to_update of finded_field.dependenciesFieldsToUpdate) {
              // Update multiple fields at once
              for (const field_name of field_to_update.fieldNames) {
                fields_to_update.push({
                  name: field_name,
                  value: field_to_update.callback(
                    result_value,
                    form.getFieldValue(field_name),
                    instance
                  ),
                });
              }
            }
          }

          if (debug) {
            console.log(
              `Key: ${field.name.join(".")}\n\nResult value: ${JSON.stringify(
                result_value,
                null,
                2
              )}`
            );
          }

          instance.setIsDirty(
            !instance.isEqual(instance.getInitialValues, form.getFieldsValue())
          );

          form.setFields(
            fields_to_update.map(({ name, value }) => ({ name, value }))
          );

          onChange?.(fields_to_update);
        }
      }}
    >
      {instance.groups.map((group, index) => (
        <div
          className={classNames({
            "mt-8": index > 0,
          })}
          key={index.toString()}
        >
          {group.title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {group.title}
            </h3>
          )}
          {group.description && (
            <p className="mt-1 text-sm text-gray-500">{group.description}</p>
          )}

          <div className="mt-4 shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                {group.fields.map((field, index) => (
                  <div
                    key={field.id + "-" + index.toString()}
                    className={classNames(getColSizeStyle(field.colSize), {
                      hidden: field.hidden,
                    })}
                  >
                    <label
                      htmlFor={field.id}
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      <>{field.label}</>
                      {field.required && <sup className="text-rose-500">*</sup>}
                    </label>
                    <FormField {...toJS(field)} instance={instance} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </RCForm>
  );
};

const SaveButton: React.FC<SaveButtonProps> = observer(
  ({ instance, hideOnNotDirty, children, onSave, ...rest }) => {
    return (
      <Transition
        show={hideOnNotDirty ? instance.isDirty : true}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Button
          {...rest}
          style="primary"
          disabled={!instance.isDirty}
          rounded
          onClick={() => {
            instance.setIsValidating(true);
            instance.setIsLoading(true);
            instance.form
              ?.validateFields()
              .then(async () => {
                try {
                  await onSave?.(instance.form?.getFieldsValue());
                  instance.saveForm();
                } catch (error: any) {
                  notification.error({
                    title: instance.formMessages.form_validation_error_title,
                    description:
                      error.message ||
                      instance.formMessages.form_validation_error_description,
                  });
                }
              })
              .catch((error) => {
                notification.error({
                  title: instance.formMessages.form_validation_error_title,
                  description:
                    error.message ||
                    instance.formMessages.form_validation_error_description,
                });
              })
              .finally(() => {
                instance.setIsValidating(false);
                instance.setIsLoading(false);
              });
          }}
        >
          {children}
        </Button>
      </Transition>
    );
  }
);

const ResetButton: React.FC<ResetButtonProps> = observer(
  ({ instance, hideOnNotDirty, children, onReset, ...rest }) => {
    return (
      //<Tooltip title={t("fields:fields_values_will_be_reset")}>
      <Transition
        show={hideOnNotDirty ? instance.isDirty : true}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Button
          {...rest}
          style="white"
          disabled={!instance.isDirty}
          rounded
          border
          onClick={() => {
            instance.resetForm();
            onReset?.();
          }}
        >
          {children}
        </Button>
      </Transition>
      //</Tooltip>
    );
  }
);

Form.Save = SaveButton;
Form.Reset = ResetButton;

export { default as Field } from "./field";
export * from "./types";
export * from "./instance";
export * from "./validator";
export * from "./messages";
export { updateMobxKeystoneModelFields } from "./utils";
