import React from "react";
import type { Route } from "@tkcrm/ui";

const Home = React.lazy(() => import("./components/Home"));
const NotFound = React.lazy(() => import("./components/NotFound"));

export const routes: Route[] = [
  {
    path: "/",
    title: "home",
    end: true,
    element: <Home />,
  },
  {
    path: "*",
    title: "not_found",
    element: <NotFound />,
  },
];
