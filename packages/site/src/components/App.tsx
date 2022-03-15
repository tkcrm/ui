import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import { routes } from "../routes";
import { Spin } from "@tkcrm/ui";

const Loading: React.FC = () => (
  <div className="grid min-h-full place-content-center">
    <Spin animate className="h-6 w-6 text-indigo-800" />
  </div>
);

const App: React.FC = () => {
  const elements = useRoutes(routes);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid min-h-full place-content-center">{elements}</div>
    </Suspense>
  );
};

export default App;
