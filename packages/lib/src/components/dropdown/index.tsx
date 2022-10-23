import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

export type DropdownProps = {
  menuButton?: React.ReactElement;
  menuText?: string;
  className?: string;
  children?: React.ReactNode;
};

export type MenuItemProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Item: React.FC<MenuItemProps> = ({
  onClick,
  children,
  className,
}) => {
  let childrenClassName = "";
  if (children && typeof children === "object" && "props" in children) {
    childrenClassName = children.props.className;
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={classNames(
            "block",
            {
              "bg-gray-100": active,
            },
            className
          )}
          aria-hidden="true"
          onClick={onClick}
        >
          {React.cloneElement(children as React.ReactElement, {
            className: classNames(
              "group flex w-full items-center px-4 py-2 text-sm focus:outline-none border-none focus:ring-0",
              childrenClassName
            ),
          })}
        </div>
      )}
    </Menu.Item>
  );
};

export interface IDropdown extends React.FC<DropdownProps> {
  Item: React.FC<MenuItemProps>;
}

export const Dropdown: IDropdown = ({
  className,
  menuButton,
  menuText,
  children,
}) => {
  return (
    <Menu
      as="div"
      className={classNames("relative inline-block text-left", className)}
    >
      <Menu.Button
        className={classNames(
          "inline-flex items-center text-sm font-medium text-indigo-700",
          className
        )}
      >
        {menuButton || (
          <>
            <span>{menuText || "action"}</span>
            <ChevronDownIcon
              className="ml-1 h-5 w-5 text-indigo-400"
              aria-hidden="true"
            />
          </>
        )}
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
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y
        divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.Item = Item;
