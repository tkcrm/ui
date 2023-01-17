import { Avatar, Page } from "@tkcrm/ui";

const PageComponent: React.FC = () => {
  return (
    <Page.Wrapper maxWidth="md">
      <Page.Heading title="Avatar" />

      <div className="grid grid-cols-1 gap-5 rounded-lg bg-white p-5 text-center shadow-sm md:grid-cols-3">
        <div>
          <Avatar img="https://i.pravatar.cc/150?img=58" />
        </div>

        <div>
          <Avatar img="https://i.pravatar.cc/150?img=67" className="rounded" />
        </div>
        <div>
          <Avatar
            img="https://i.pravatar.cc/150?img=60"
            className="rounded-lg"
          />
        </div>
      </div>
    </Page.Wrapper>
  );
};

export default PageComponent;
