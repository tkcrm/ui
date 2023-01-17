import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import * as React from "react";

import { get } from "../../utils";

export type ColumnProps<RecordType = any> = {
  title: string;
  key: string;
  className?: string;
  sr_only?: boolean;
  render?: (
    key: string,
    value: any,
    data_item: RecordType,
    model?: any
  ) => React.ReactNode;
};

export type RowProps = {
  className?: string;
  hovered?: boolean;
  columns: ColumnProps[];
  data_item: any;
  model?: any;
};

export type TableProps = {
  className?: string;
  hovered?: boolean;
  columns: ColumnProps[];
  data?: any[];
  rowKey: string;
  model?: any;
  noDataText?: string;
};

const Row: React.FC<RowProps> = ({ columns, data_item, className, model }) => {
  return (
    <tr
      className={classNames(
        "transition duration-100 ease-in-out hover:bg-gray-100",
        className
      )}
    >
      {columns.map((column) => (
        <td
          className={classNames(
            "whitespace-nowrap px-6 py-4 text-sm text-gray-500",
            column.className
          )}
          key={column.key}
        >
          {column.render
            ? column.render(
                column.key,
                get(data_item, column.key.split(".")),
                data_item,
                model
              )
            : get(data_item, column.key.split("."))}
        </td>
      ))}
    </tr>
  );
};

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowKey,
  noDataText,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) =>
                    column.sr_only ? (
                      <th
                        scope="col"
                        className="relative px-6 py-3"
                        key={index}
                      >
                        <span className="sr-only">{column.title}</span>
                      </th>
                    ) : (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        key={index}
                      >
                        {column.title}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {(data || []).map((item) => (
                  <Row
                    columns={columns}
                    key={item[rowKey]}
                    className="bg-white even:bg-gray-50"
                    data_item={item}
                    {...rest}
                  />
                ))}
                {data?.length == 0 && (
                  <tr>
                    <td colSpan={columns.length} className="bg-white">
                      <div className="flex flex-col items-center justify-center py-6 text-sm text-gray-500">
                        <ExclamationTriangleIcon
                          className="h-16 w-16 text-indigo-600"
                          aria-hidden="true"
                        />
                        {noDataText || "no_data"}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
