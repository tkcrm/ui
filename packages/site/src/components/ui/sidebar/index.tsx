import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Route, availableRoutes } from "@tkcrm/ui";

import { routes } from "@/routes";

const NavItem: React.FC<Route> = (item) => {
  const location = useLocation();

  let match = false;
  if (
    (item.path === "/" && location?.pathname === "/") ||
    (item.path !== "/" &&
      location?.pathname?.startsWith(("/" + item.path) as string))
  ) {
    match = true;
  }

  return (
    <Link
      to={item.path as string}
      className={classNames(
        "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
        {
          "bg-gray-100 text-gray-900": match,
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !match,
        }
      )}
    >
      {item.icon && (
        <item.icon
          className={classNames("mr-3 h-6 w-6 flex-shrink-0", {
            "text-gray-500": match,
            "text-gray-400 group-hover:text-gray-500": !match,
          })}
          aria-hidden="true"
        />
      )}
      {item.title}
    </Link>
  );
};

const Logo = () => (
  <div className="flex w-full text-2xl font-semibold md:text-3xl">
    <span className="font-extralight">TK</span>
    <span>CRM</span>
    <span className="mx-2">/</span>
    <span
      className="flex items-center justify-center rounded-lg
    bg-indigo-600 px-2.5 text-base font-semibold text-white"
    >
      UI
    </span>
  </div>
);

const Sidebar: React.FC<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
}> = observer(({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigation = availableRoutes(routes).filter(
    (r) => !r.hide_in_menu && r.title
  );

  return (
    <>
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setIsSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full
                      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Logo />
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {navigation.map((item, index) => (
                    <NavItem key={index} {...item} />
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0"></div>
        </Dialog>
      </Transition.Root>

      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <Link to="/" className="flex flex-shrink-0 items-center px-4">
              <Logo />
            </Link>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
});

export default Sidebar;
