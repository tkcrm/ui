# Tailwind UI React Components

Simple and feature-rich tailwind react components

> Documentation is under development

## Installation

```bash
npm i @tkcrm/ui --save
```

### Add styles

Add styles to your exist React project

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "@tkcrm/ui/dist/style.css";
// ...
```

or import from your exist base css file

```css
@import "@tkcrm/ui/dist/style.css";
// ...
```

## Available components

- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Dropdown
- Errorboundary
- Form
- Link
- Modal
- Notification
- Page
- Preloader
- Result
- Spin
- Table

### Form fields

- Number
- Text
- Textarea
- Password
- Email
- Switch
- Datetime
- Time
- Date
- Month
- Week

## Examples

### Alert

```tsx
import { Alert } from "@tkcrm/ui";

const MyComponent: React.FC = () => {
  return (
    <>
      <Alert type="success" title="Some pretty title" text="Hello world!" />
    </>
  );
};
```

### Notification

```tsx
import { notification } from "@tkcrm/ui";

notification.error({
  title: "Error!"
  description: "Something went wrong",
  duration: 3000,
});

notification.success({ title: "Successfully created" });

notification.info({
    description: "Successfully created",
    image: "http://image_link/",
});
```

### Modal

```tsx
import { useState } from "react";
import { Modal, Button } from "@tkcrm/ui";

const MyComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        show={showModal}
        onClose={setShowModal}
        type="danger"
        footer={
          <>
            <Button
              style="danger"
              rounded
              loading={loading}
              onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setShowModal(false);
                  }, 3000)
                }
              }
              className="ml-3"
            >
              {t("delete")}
            </Button>
            <Button
              style="white"
              rounded
              border
              onClick={() => setShowModal(false)}
            >
              {t("cancel")}
            </Button>
          </>
        }
      >
        <Modal.Title>Delete user</Modal.Title>
        <div className="mt-2">
          <Modal.Description>
            Are you sure you want to delete this user? It will be impossible to
            undo this action.
          </Modal.Description>
        </div>
      </Modal>
    </>
  );
};
```

### Form

You can use forms with any state manager, for example `mobx-keystone`

#### Define `mobx-keystone` model and a form configuration

```tsx
import type { FormGroupProps } from "@tkcrm/ui";

import { model, Model, prop, tProp, types } from "mobx-keystone";

const userForm: FormGroupProps[] = [
  {
    title: "User info",
    fields: [
      {
        type: "text",
        name: ["firstName"],
        label: "First name",
        required: true,
        colSize: 6,
      },
      {
        type: "text",
        name: ["lastName"],
        label: "Last name",
        colSize: 6,
      },
      {
        type: "number",
        name: ["age"],
        label: "Age",
        colSize: 4,
      },
      {
        type: "date",
        name: ["birthday"],
        label: "Birthday",
        required: true,
        colSize: 4,
      },
      {
        type: "switch",
        name: ["isActive"],
        label: "Is Active",
        colSize: 4,
      },
    ],
  },
  {
    title: "Notification settings",
    fields: [
      {
        type: "switch",
        name: ["notifyEmail"],
        label: "Email",
        colSize: 4,
      },
      {
        type: "switch",
        name: ["notifySMS"],
        label: "SMS",
        colSize: 4,
      },
      {
        type: "switch",
        name: ["notifyPush"],
        label: "Push",
        colSize: 4,
      },
    ],
  },
];

const organizationForm: FormGroupProps[] = [
  {
    title: "Organization info",
    fields: [
      {
        type: "text",
        name: ["shortName"],
        label: "Short name",
        required: true,
        colSize: 6,
      },
      {
        type: "text",
        name: ["fullName"],
        label: "Full name",
        colSize: 6,
      },
      {
        type: "text",
        name: ["address"],
        label: "Address",
        colSize: 10,
      },
      {
        type: "switch",
        name: ["isActive"],
        label: "Is active",
        colSize: 2,
      },
    ],
  },
];

@model("frontend/user")
export class UserModel extends Model({
  firstName: tProp(types.string, "").withSetter(),
  lastName: tProp(types.string, "").withSetter(),
  age: tProp(types.number, 0).withSetter(),
  birthday: tProp(types.maybe(types.dateString)).withSetter(),
  isActive: tProp(types.boolean, false).withSetter(),
  notifyEmail: tProp(types.boolean, false).withSetter(),
  notifySMS: tProp(types.boolean, false).withSetter(),
  notifyPush: tProp(types.boolean, false).withSetter(),
}) {}

@model("frontend/users")
export class UsersModel extends Model({
  getResponse: prop<UserModel>().withSetter(),
}) {}
```

#### Add form component

```tsx
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-keystone";
import {
  Form,
  Page,
  notification,
  getFormInstance,
  updateMobxKeystoneModelFields,
  FormInstance,
} from "@tkcrm/ui";

interface FormProps {
  instance: FormInstance;
  onSave?: (values: Record<string, any>) => void;
}

const FormControls: React.FC<FormProps> = observer(({ instance, onSave }) => {
  const handleUpdate = async (): Promise<boolean> => {
    return new Promise((r) => {
      setTimeout(() => {
        notification.success({ title: "Successfully updated" });
        r(true);
      }, 300);
    });
  };

  return (
    <div className="mt-4 flex justify-end">
      <Form.Reset instance={instance} className="mr-4">
        Reset
      </Form.Reset>
      <Form.Save
        instance={instance}
        loading={instance.isLoading}
        onSave={async (values) => {
          await handleUpdate();
          onSave?.(values);
        }}
      >
        Save
      </Form.Save>
    </div>
  );
});

const FormData: React.FC<FormProps> = ({ instance }) => {
  return (
    <>
      <Form instance={instance} />
      <FormControls instance={instance} />
    </>
  );
};

const Forms: React.FC = () => {
  const userModel = new UsersModel({
    getResponse: new UserModel({ firstName: "John" }),
  });

  let orgValues: Record<string, any> = {
    shortName: "LLC Google inc.",
    isActive: true,
  };

  const userFormInstance = getFormInstance(
    userForm,
    getSnapshot(userModel.getResponse),
    {
      formMessages: {
        form_validation_error_description: "Ошибка валидации формы",
      },
    }
  );

  const orgFormInstance = getFormInstance(organizationForm, orgValues);

  return (
    <Page.Wrapper max_width="lg">
      <Page.Heading title="Forms" />
      {/* Mobx Keystone example */}
      <FormData
        instance={userFormInstance}
        onSave={(values) => {
          updateMobxKeystoneModelFields(userModel.getResponse, values);
        }}
      />

      <div className="mt-8">
        {/* Example without state manager */}
        <FormData
          instance={orgFormInstance}
          onSave={(values) => {
            orgValues = values;
          }}
        />
      </div>
    </Page.Wrapper>
  );
};
```

#### Translate form messages

All form messages are available from here

```tsx
import { FormMessages } from "@tkcrm/ui"
```

Add a new messages to a new form instance

```tsx
const formInstance = getFormInstance(
    userForm,
    {},
    {
      formMessages: {
        form_validation_error_title: "Validating rror!",
        form_validation_error_description: "Form validating error",
      },
    }
  );
```
