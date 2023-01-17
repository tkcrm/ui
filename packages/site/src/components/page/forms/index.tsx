import {
  Form,
  FormInstance,
  getFormInstance,
  notification,
  Page,
  updateMobxKeystoneModelFields,
} from "@tkcrm/ui";
import classNames from "classnames";
import { getSnapshot } from "mobx-keystone";
import { observer } from "mobx-react-lite";

import {
  organizationForm,
  userForm,
  UserModel,
  UsersModel,
} from "./formConfig";

interface FormProps {
  instance: FormInstance;
  onSave?: (values: Record<string, any>) => void;
}

const FormValuesDataItem: React.FC<{
  title: string;
  values: Record<string, any>;
  className?: string;
}> = observer(({ title, values, className }) => {
  return (
    <div className={classNames(className)}>
      <h4 className="mb-2 text-lg font-medium">{title}</h4>
      <pre className="max-w-full overflow-x-scroll rounded-md bg-slate-800 p-5 text-sm leading-6 text-slate-100">
        <code>{JSON.stringify(values, null, 2)}</code>
      </pre>
    </div>
  );
});

const FormValuesData: React.FC<FormProps> = observer(({ instance }) => {
  return (
    <>
      <FormValuesDataItem
        title="Initial values"
        values={instance.getInitialValues}
      />
      <FormValuesDataItem
        title="Form temp values"
        values={instance.getTempValues}
      />
    </>
  );
});

const FormControls: React.FC<FormProps> = observer(({ instance, onSave }) => {
  const handleUpdate = async (): Promise<boolean> => {
    return new Promise((r) => {
      setTimeout(() => {
        notification.success("Successfully updated");
        r(true);
      }, 200);
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

const FormData: React.FC<FormProps & { formTitle: string }> = observer(
  ({ instance, formTitle }) => {
    return (
      <>
        <div className="mb-5 text-xl font-semibold">{formTitle}</div>
        <Form instance={instance} />
        <FormControls instance={instance} />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormValuesData instance={instance} />
        </div>
      </>
    );
  }
);

const Forms: React.FC = () => {
  const userModel = new UsersModel({
    getResponse: new UserModel({ firstName: "John" }),
  });

  const userFormInstance = getFormInstance(
    userForm,
    getSnapshot(userModel.getResponse)
  );

  let orgValues: Record<string, any> = {
    shortName: "LLC Google inc.",
    isActive: true,
  };

  const orgFormInstance = getFormInstance(organizationForm, orgValues);

  return (
    <Page.Wrapper maxWidth="md">
      <Page.Heading title="Forms" />

      <FormData
        formTitle="Mobx Keystone example"
        instance={userFormInstance}
        onSave={(values) => {
          updateMobxKeystoneModelFields(userModel.getResponse, values);
        }}
      />

      <div className="mt-8">
        <FormData
          formTitle="Simple form example"
          instance={orgFormInstance}
          onSave={(values) => {
            orgValues = values;
          }}
        />
      </div>
    </Page.Wrapper>
  );
};

export default Forms;
