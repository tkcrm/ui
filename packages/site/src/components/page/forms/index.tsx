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

import { routes } from "@/routes";
import {
  userForm,
  UserModel,
  UsersModel,
  organizationForm,
} from "./formConfig";

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
    <Page.Wrapper maxWidth="md">
      <Page.Heading title="Forms" routes={routes} />

      <div className="mb-5 text-xl font-semibold">Mobx Keystone example</div>
      <FormData
        instance={userFormInstance}
        onSave={(values) => {
          updateMobxKeystoneModelFields(userModel.getResponse, values);
        }}
      />

      <div className="mt-8">
        <div className="mb-5 text-xl font-semibold">Simple form example</div>
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

export default Forms;
