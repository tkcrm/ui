import * as React from "react";
import classNames from "classnames";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";

export type SortType = "desc" | "asc";

export type SortButtonProps = {
  active: SortType;
  className?: string;
  onChange?: (type: SortType) => void;
};

type MenuItemProps = {
  Icon: any;
  title: SortType;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ Icon, title, onClick }) => {
  return (
    <Menu.Item onClick={onClick}>
      {({ active }) => (
        <button
          className={classNames(
            "group flex w-full items-center rounded-md px-2 py-2 text-sm",
            {
              "bg-indigo-600 text-white": active,
              "text-gray-700": !active,
            }
          )}
        >
          <Icon
            className={classNames("mr-2 h-5 w-5", { "text-gray-400": !active })}
            aria-hidden="true"
          />
          {title}
        </button>
      )}
    </Menu.Item>
  );
};

const menuItems: MenuItemProps[] = [
  { Icon: SortDescendingIcon, title: "desc" },
  { Icon: SortAscendingIcon, title: "asc" },
];

const SortButton: React.FC<SortButtonProps> = ({
  className,
  active,
  onChange,
}) => {
  return (
    <Menu as="div" className={classNames("relative inline-block text-left")}>
      <Menu.Button
        className={classNames(
          `relative -ml-px inline-flex items-center border border-gray-300 bg-gray-50 px-4
                py-2 text-sm font-medium text-gray-700 transition duration-200
                ease-in-out hover:bg-gray-100
                focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`,
          className
        )}
      >
        {active === "desc" && (
          <SortDescendingIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
        {active === "asc" && (
          <SortAscendingIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
        <span className="ml-2">Sort</span>
        <ChevronDownIcon
          className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-56 origin-top-right divide-y
        divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                {...item}
                onClick={() => onChange?.(item.title)}
              />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortButton;
