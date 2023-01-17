import type { Route } from "@tkcrm/ui";
import React from "react";

const NotFound = React.lazy(() => import("./components/NotFound"));

export const routes: Route[] = [
  {
    path: "/",
    title: "Home",
    end: true,
    lazy_element: import("@/components/Home"),
  },
  {
    path: "/alert",
    title: "Alert",
    lazy_element: import("@/components/page/alert"),
  },
  {
    path: "/avatar",
    title: "Avatar",
    lazy_element: import("@/components/page/avatar"),
  },
  {
    path: "/badge",
    title: "Badge",
    lazy_element: import("@/components/page/badge"),
  },
  {
    path: "/forms",
    title: "Forms",
    lazy_element: import("@/components/page/forms"),
  },
  {
    path: "*",
    title: "not_found",
    unavailable: true,
    element: <NotFound />,
  },
];
