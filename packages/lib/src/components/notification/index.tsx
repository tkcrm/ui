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

type NotificationTypes = "error" | "success" | "info" | "transparent";

interface ComponentStyleParams {
  icon_color?: string;
  icon?: any;
}

export interface NotificationProps {
  type: NotificationTypes;
  title: string;
  description?: string;
  className?: string;
  closeIcon?: boolean;
  duration?: number | null;
  image?: string;
  extra?: React.ReactNode;
}

type CustomNotificationProps = Omit<NotificationProps, "type" | "title"> & {
  title?: string;
};

const getStyle = (
  type?: NotificationTypes
): ComponentStyleParams | undefined => {
  if (!type) return undefined;

  const icons: Record<NotificationTypes, ComponentStyleParams> = {
    error: {
      icon_color: "text-rose-400",
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
    transparent: {},
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

export const notification = ({
  title,
  description,
  type,
  closeIcon,
  duration,
  image,
  extra,
}: NotificationProps): void => {
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

notification.error = (props: CustomNotificationProps) =>
  notification({
    ...props,
    type: "error",
    title: props.title || "Error!",
  });

notification.success = (props: CustomNotificationProps) =>
  notification({
    ...props,
    type: "success",
    title: props.title || "Success!",
  });

notification.info = (props: CustomNotificationProps) =>
  notification({
    ...props,
    type: "info",
    title: props.title || "Info!",
  });

notification.transparent = (props: NotificationProps) =>
  notification({
    ...props,
    type: "transparent",
  });
