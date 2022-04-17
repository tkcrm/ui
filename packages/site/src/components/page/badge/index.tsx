import { Page, Badge } from "@tkcrm/ui";

const PageComponent: React.FC = () => {
  return (
    <Page.Wrapper maxWidth="md">
      <Page.Heading title="Badge" />

      <div className="grid grid-cols-1 gap-5 rounded-lg bg-white p-5 text-center shadow-sm md:grid-cols-5">
        <div>
          <Badge type="primary">primary</Badge>
        </div>
        <div>
          <Badge type="info">info</Badge>
        </div>
        <div>
          <Badge type="success">success</Badge>
        </div>
        <div>
          <Badge type="warning">warning</Badge>
        </div>
        <div>
          <Badge type="error">error</Badge>
        </div>
      </div>
    </Page.Wrapper>
  );
};

export default PageComponent;
