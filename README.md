# Tailwind UI React Components

Simple and feature-rich tailwind react components.

> Documentation is under development

## Requirements

- `npm 7+`
- `React 17+`
- `React Router 6+`
- `mobx 6+`
- `mobx-keystone 0.67+`

## Installation

```bash
npm i @tkcrm/ui --save
```

### Add styles

Add styles to your exist React project

```jsx
import Rreact from "react";
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

Forms in `@tkcrm/ui` requires `mobx-keystone` model

#### Define `mobx-keystone` model

> TODO: add description

#### Add configuration for your form

```ts
import type { FormGroupProps } from "@tkcrm/ui";

const userFormConfig: FormGroupProps[] = [
  {
    title: "User info",
    fields: [
      {
        type: "text",
        name: ["first_name"],
        label: "First name",
        required: true,
        colSize: 6,
      },
      {
        type: "text",
        name: ["last_name"],
        label: "Last name",
        required: true,
        colSize: 6,
      },
      {
        type: "number",
        name: ["age"],
        label: "age",
        colSize: 4,
        settings: {
          min: 1,
        },
      },
      {
        type: "date",
        name: ["birthday"],
        label: "birthday",
        colSize: 4,
      },
      {
        type: "boolean",
        name: ["is_active"],
        label: "Is active",
        colSize: 4,
      },
    ],
  },
];
```

#### Add form component

```tsx
import { observer } from "mobx-react-lite";
import { Preloader, Form } from "@tkcrm/ui";

const FormData: React.FC = observer(() => {
  // Import mobx keystone user model
  const { users } = useStore();

  if (users.isLoading) {
    return <Preloader fullContainerHeight />;
  }

  return (
    <Form
      model={users}
      draft={users.draft}
      initialValues={users.draft?.data.getInitialValues}
      groups={userFormConfig}
    />
  );
});
```

#### Use form without `mobx` and `configuration`

```tsx
import { useState } from "react";
import { Button, Field, notification } from "@tkcrm/ui";

const FormData: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  if (users.isLoading) {
    return <Preloader fullContainerHeight />;
  }

  const handleUpdate = () => {
    setLoading(true;)
    setTimeout(() => {
      setLoading(false);
      notification.success({ title: "Successfully updated" });
    }, 3000);
  }

  return (
    <div className="d-flex flex-col">
        <Field.Input.Text
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Field.Input.Number
          value={age}
          onChange={(event) => setAge(event.target.value)}
          className="mt-3"
        />
        <Button
          rounded
          bold
          className="w-full justify-center"
          onClick={handleUpdate}
          loading={loading}
          >
            update
        </Button>
    </div>
  );
});
```
