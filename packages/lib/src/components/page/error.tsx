import * as React from "react";
import { Link } from "react-router-dom";

type SupportParameters = {
  show?: boolean;
  text?: string;
  link?: string;
};

export interface PageErrorProps {
  code: number;
  title: string;
  description?: string;
  extra?: React.ReactNode;
  homeText?: string;
  support?: SupportParameters;
}

export const PageError: React.FC<PageErrorProps> = ({
  code,
  title,
  description,
  extra,
  homeText,
  support,
}) => {
  return (
    <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
            {code}
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-base text-gray-500">{description}</p>
              )}
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              {extra || (
                <>
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-md border border-transparent
                bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {homeText || "go_back_dashboard"}
                  </Link>
                  {support?.show && (
                    <Link
                      to={support.link || "/support"}
                      className="inline-flex items-center rounded-md border border-transparent
                bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {support.text || "contact_support"}
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
