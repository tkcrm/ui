import React from "react";
import { PageErrorProps, PageError } from "./error";
import { PageHeadingProps, PageHeading } from "./heading";
import { PageWrapperProps, PageWrapper } from "./wrapper";

interface IPage {
  Error: React.FC<PageErrorProps>;
  Heading: React.FC<PageHeadingProps>;
  Wrapper: React.FC<PageWrapperProps>;
}

export const Page: IPage = {
  Error: PageError,
  Heading: PageHeading,
  Wrapper: PageWrapper,
};
