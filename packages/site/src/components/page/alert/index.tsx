import { Alert, Page } from "@tkcrm/ui";

const alert_text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`;

const PageComponent: React.FC = () => {
  return (
    <Page.Wrapper maxWidth="md">
      <Page.Heading title="Alert" />

      <div className="rounded-lg bg-white p-5 shadow-sm">
        <h4 className="mb-2 font-medium">Success</h4>
        <Alert type="success" title="Success title" text={alert_text} />

        <h4 className="mt-6 mb-2 font-medium">Info</h4>
        <Alert type="info" title="Info title" text={alert_text} />

        <h4 className="mt-6 mb-2 font-medium">Warning</h4>
        <Alert type="warning" title="Warning title" text={alert_text} />

        <h4 className="mt-6 mb-2 font-medium">Error</h4>
        <Alert type="error" title="Error title" text={alert_text} />
      </div>
    </Page.Wrapper>
  );
};

export default PageComponent;
