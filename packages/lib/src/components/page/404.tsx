import React from "react";
import { PageError } from "./error";

export const Page404: React.FC = () => (
  <PageError
    code={404}
    title="page_not_found"
    description="page_error_404_description"
  />
);
