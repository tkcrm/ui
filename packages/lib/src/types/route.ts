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
