import React from "react";
import { PageError, PageErrorProps } from "./error";
import { PageHeading, PageHeadingProps } from "./heading";
import { PageWrapper, PageWrapperProps } from "./wrapper";

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
