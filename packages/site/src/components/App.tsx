import { Bars3Icon } from "@heroicons/react/24/outline";
import { availableRoutes, Preloader } from "@tkcrm/ui";
import { Suspense, useState } from "react";
import { useRoutes } from "react-router-dom";

import { routes } from "@/routes";
import Sidebar from "./ui/sidebar";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const elements = useRoutes(availableRoutes(routes));

  return (
    <Suspense fallback={<Preloader fullScreenHeight />}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex min-h-full flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md
              text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex flex-1">
          <div className="min-h-full min-w-full">
            <Suspense fallback={<Preloader fullScreenHeight />}>
              {elements}
            </Suspense>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default App;
