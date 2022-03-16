import * as React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";

export type BreadcrumbItem = {
  name: string;
  path: string;
  current?: boolean;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  classNameItem?: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  items,
}): JSX.Element => {
  return (
    <nav
      className={classNames("flex pt-10", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                to={page.path}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
