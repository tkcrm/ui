import * as React from "react";
import type { RouteObject } from "react-router-dom";

export type RouteHook = (model: any, params: Record<string, any>) => void;

export type Route = RouteObject & {
  title?: string;
  lazy_element?: Promise<{ default: React.FC }>;
  end?: boolean;
  to?: string;
  replace?: boolean;
  children?: Route[];
  hide_in_menu?: boolean;
  unavailable?: boolean;
  icon?: any;
  store?: string;
  onEnter?: RouteHook;
  onLeave?: RouteHook;
};

const processRemoteLazyRoutes = (routes: Route[]): Route[] => {
  return routes
    .filter((route) => route.element || route.lazy_element)
    .map((route) => {
      if (route.element) return route;
      if (route.lazy_element) {
        const lazy_element: Promise<{ default: React.FC }> = route.lazy_element;
        const Component = React.lazy(() => lazy_element);
        route.element = <Component />;
      }
      if (route.children) {
        route.children = processRemoteLazyRoutes(route.children);
      }
      return route;
    });
};

export const availableRoutes = (routes: Route[]): Route[] => {
  const filtered = routes.filter((route) => !route.unavailable);
  return processRemoteLazyRoutes(filtered);
};
