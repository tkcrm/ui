import React from "react";
import { Route } from "@tkcrm/ui/src/types/route";

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
