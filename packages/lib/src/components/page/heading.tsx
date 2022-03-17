import * as React from "react";
import classNames from "classnames";
import { useLocation, matchPath } from "react-router-dom";
import { Route } from "../../types/route";
import Breadcrumb, { BreadcrumbItem } from "../breadcrumb";

export type PageHeadingProps = {
  title?: string;
  className?: string;
  extra?: React.ReactNode;
  routes?: Route[];
};

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  className,
  extra,
  routes = [],
}) => {
  const location = useLocation();

  const breadcrumbItems: BreadcrumbItem[] = [];
  const paths = location.pathname.split("/").filter(Boolean) || [];

  for (const path of paths) {
    const exist_route = routes.find((route) => route.path === path);
    if (exist_route?.title && exist_route.path) {
      let path = exist_route.path;
      if (!path.startsWith("/")) {
        path = "/" + path;
      }
      breadcrumbItems.push({ name: exist_route.title, path });
    }
  }

  const route_current = routes.find((r) =>
    matchPath({ path: r.path as string, end: r.end }, location.pathname || "")
  );

  if (
    route_current?.title &&
    location.pathname &&
    breadcrumbItems.length > 0 &&
    breadcrumbItems.slice(-1)[0].name !== route_current.title
  ) {
    breadcrumbItems.push({
      name: route_current.title,
      path: location.pathname,
    });
  }

  return (
    <>
      {!!breadcrumbItems?.length && <Breadcrumb items={breadcrumbItems} />}
      <div
        className={classNames(
          "flex flex-col items-center py-10 sm:flex-wrap sm:justify-center md:flex-row md:justify-between",
          {
            "py-6": breadcrumbItems?.length,
          },
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            {title}
          </h2>
        </div>
        {extra && <div className="mt-4 md:mt-0 md:ml-4">{extra}</div>}
      </div>
    </>
  );
};
