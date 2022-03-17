import * as React from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { getSnapshot, isModel } from "mobx-keystone";
import RCForm from "rc-field-form";
import { Transition } from "@headlessui/react";

import {
  FormProps,
  SaveButtonProps,
  ResetButtonProps,
  FieldData,
  FieldsToUpdate,
  FieldBaseProps,
} from "./types";
import { field_types, field_mixins } from "./field_extensions";
import {
  findFieldInGroups,
  getValidateRules,
  getColSizeStyle,
  getFieldsFromGroups,
  changeDraftFields,
} from "./utils";

import { notification } from "../notification";
import { Alert } from "../alert";
import { Button } from "../button";

/**
 * Компонент поля в форме
 */
const FormField: React.FC<FieldData> = observer((field) => {
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
              model: field.model,
              draft: field.draft,
              name: field.name,
              placeholder: field.placeholder || "type_field",
              id: field.name.join("-"),
              className: [
                props?.className,
                meta.errors.length > 0 &&
                  "border-rose-300 text-rose-900 placeholder-rose-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500",
              ]
                .filter(Boolean)
                .join(" "),
              ...(field.settings &&
                ({
                  settings: {
                    ...field_types[field.type].props.settings,
                    ...field.settings,
                  },
                } as FieldBaseProps)),
            })}
            {meta.errors.map((error) => (
              <p className="mt-2 text-sm text-rose-600" key={error}>
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
});

export interface IForm extends React.FC<FormProps> {
  Save: React.FC<SaveButtonProps>;
  Reset: React.FC<ResetButtonProps>;
}

export const Form: IForm = ({ draft, groups, model, initialValues, debug }) => {
  const [form] = RCForm.useForm();
  const fields = getFieldsFromGroups(groups);

  draft.form = form;
  draft.fields = fields;

  return (
    <RCForm
      autoComplete="off"
      form={form}
      fields={fields}
      initialValues={
        isModel(initialValues) ? getSnapshot(initialValues) : initialValues
      }
      onFieldsChange={(changed_fields) => {
        for (const field of changed_fields as FieldData[]) {
          let result_value = field.value;

          // Заплатка для Field.Boolean
          if (field.value?.target?.checked !== undefined) {
            result_value = field.value.target.checked;
          }

          const fields_to_update: FieldsToUpdate[] = [
            { name: field.name, value: result_value },
          ];

          /**
           * Смотрим зависимые поля с миксинам
           */
          const finded_field = findFieldInGroups(groups, field.name);
          if (finded_field?.dependenciesMixin) {
            for (const mixin of finded_field.dependenciesMixin) {
              const mixin_callback = field_mixins[mixin.name];
              if (!mixin_callback) {
                throw new TypeError(`undefined mixin name ${mixin.name}`);
              }

              // Обновляем сразу несколько полей
              for (const field_name of mixin.fieldNames) {
                fields_to_update.push({
                  name: field_name,
                  value: mixin_callback(
                    result_value,
                    form.getFieldValue(field_name),
                    draft
                  ),
                });
              }
            }
          }

          /**
           * Смотрим зависимые поля с кастомными реализациями
           */
          if (finded_field?.dependenciesFieldsToUpdate) {
            for (const field_to_update of finded_field.dependenciesFieldsToUpdate) {
              // Обновляем сразу несколько полей
              for (const field_name of field_to_update.fieldNames) {
                fields_to_update.push({
                  name: field_name,
                  value: field_to_update.callback(
                    result_value,
                    form.getFieldValue(field_name),
                    draft
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

          // Update draft fields
          changeDraftFields(draft, fields_to_update);
        }
      }}
    >
      {groups.map((group, index) => (
        <div
          className={classNames({
            "mt-8": index > 0,
          })}
          key={index}
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
                {group.fields.map((field) => (
                  <div
                    key={field.name.join(".")}
                    className={classNames(getColSizeStyle(field.colSize), {
                      hidden: field.hidden,
                    })}
                  >
                    <label
                      htmlFor={field.name.join("-")}
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      {typeof field.label === "string" && field.label}
                      {typeof field.label !== "string" && field.label}
                      {field.required && <sup className="text-rose-500">*</sup>}
                    </label>
                    <FormField {...field} model={model} draft={draft} />
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
  ({ draft, hideOnNotDirty, children, onSave, ...rest }) => {
    if (draft === undefined) return null;

    const { isDirty, form } = draft;

    return (
      <Transition
        show={hideOnNotDirty ? isDirty : true}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Button
          {...rest}
          loading={false}
          style="primary"
          disabled={!isDirty}
          rounded
          onClick={() => {
            form
              ?.validateFields()
              .then(async () => {
                try {
                  await onSave?.();
                  draft.commit();
                } catch {}
              })
              .catch((error) => {
                notification.error({
                  description: error.message,
                });
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
  ({ draft, hideOnNotDirty, children, onReset, ...rest }) => {
    if (draft === undefined) return null;

    const { isDirty, form, data, fields } = draft;

    //if (hideOnNotDirty && !isDirty) return null;

    return (
      //<Tooltip title={t("fields:fields_values_will_be_reset")}>
      <Transition
        show={hideOnNotDirty ? isDirty : true}
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
          disabled={!isDirty}
          rounded
          border
          onClick={() => {
            draft.reset();
            form?.resetFields();
            fields && form?.setFields(fields);
            form?.setFieldsValue(getSnapshot(data));
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
export * from "./validator";
