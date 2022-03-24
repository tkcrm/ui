import * as React from "react";
import classNames from "classnames";
import RCNotification from "rc-notification";
import { NotificationInstance } from "rc-notification/lib/Notification";
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { capitalizeFirstLetter } from "../..";

type NotificationTypes = "error" | "success" | "info" | "warning" | "custom";

interface ComponentStyleParams {
  icon_color?: string;
  icon?: any;
}

export interface NotificationParameters {
  type: NotificationTypes;
  title: string;
  description?: string | null;
  className?: string;
  closeIcon?: boolean;
  duration?: number | null;
  image?: string;
  extra?: React.ReactNode;
}

type CustomNotificationParameters = Omit<
  NotificationParameters,
  "title" | "description"
> & {
  title?: string | null;
  description?: string | null;
};

type CustomNotificationFunc = (
  title?: string | null,
  description?: string | null,
  params?: CustomNotificationParameters
) => void;

const getStyle = (
  type?: NotificationTypes
): ComponentStyleParams | undefined => {
  if (!type) return undefined;

  const icons: Record<NotificationTypes, ComponentStyleParams> = {
    error: {
      icon_color: "text-rose-400",
      icon: ExclamationIcon,
    },
    warning: {
      icon_color: "text-yellow-400",
      icon: ExclamationIcon,
    },
    success: {
      icon_color: "text-emerald-400",
      icon: CheckCircleIcon,
    },
    info: {
      icon_color: "text-cyan-400",
      icon: InformationCircleIcon,
    },
    custom: {},
  };

  return icons[type];
};

let instance: any = null;
RCNotification.newInstance(
  {
    style: {},
    maxCount: 5,
    closeIcon: (
      <button
        className="inline-flex rounded-md bg-white text-gray-400
      hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="sr-only">Close</span>
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    ),
  },
  (n) => {
    instance = n;
  }
);

type NotificationFunc = (params: NotificationParameters) => void;
interface INotification extends NotificationFunc {
  error: CustomNotificationFunc;
  warning: CustomNotificationFunc;
  info: CustomNotificationFunc;
  success: CustomNotificationFunc;
  custom: (params: NotificationParameters) => void;
}

export const notification: INotification = ({
  title,
  description,
  type,
  closeIcon,
  duration,
  image,
  extra,
}: NotificationParameters): void => {
  const notification: NotificationInstance = instance;

  const style = getStyle(type);

  if (typeof duration === "number") {
    duration = duration / 1000;
  }
  if (typeof duration === "undefined") {
    duration = 2;
  }

  notification.notice({
    content: (
      <div className="flex w-60 items-start sm:w-80">
        {style?.icon && !image && (
          <div className="flex-shrink-0">
            <style.icon
              className={classNames("h-6 w-6", style.icon_color)}
              aria-hidden="true"
            />
          </div>
        )}
        {image && (
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={image} alt="" />
          </div>
        )}
        <div
          className={classNames("w-0 flex-1", {
            "ml-3 pt-0.5": style?.icon,
          })}
        >
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {extra && <p className="mt-4 flex">{extra}</p>}
        </div>
      </div>
    ),
    closable: closeIcon !== undefined ? closeIcon : true,
    duration,
  });
};

const getParams = (
  params: CustomNotificationParameters
): NotificationParameters => {
  const result_params: NotificationParameters = {
    ...params,
    type: params.type,
    title: params.title || capitalizeFirstLetter(params.type),
  };

  return result_params;
};

notification.error = (title, description, params) =>
  notification(getParams({ ...params, title, description, type: "error" }));

notification.success = (title, description, params) =>
  notification(getParams({ ...params, title, description, type: "success" }));

notification.info = (title, description, params) =>
  notification(getParams({ ...params, title, description, type: "info" }));

notification.warning = (title, description, params) =>
  notification(getParams({ ...params, title, description, type: "warning" }));

notification.custom = (params) => notification({ ...params, type: "custom" });
