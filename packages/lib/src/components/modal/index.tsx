import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import * as React from "react";

type ModalTypes = "error" | "success" | "info";

export interface ModalProps {
  show: boolean;
  onClose: (value: boolean) => void;
  type?: ModalTypes;
  className?: string;
  hideCloseButton?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

interface ComponentStyleParams {
  bg: string;
  icon_color: string;
  icon: any;
}

const getStyle = (type?: ModalTypes): ComponentStyleParams | undefined => {
  if (!type) return undefined;

  const icons: Record<ModalTypes, ComponentStyleParams> = {
    error: {
      bg: "bg-rose-100",
      icon_color: "text-rose-600",
      icon: ExclamationTriangleIcon,
    },
    success: {
      bg: "bg-indigo-100",
      icon_color: "text-indigo-600",
      icon: CheckCircleIcon,
    },
    info: {
      bg: "bg-cyan-100",
      icon_color: "text-cyan-600",
      icon: InformationCircleIcon,
    },
  };

  return icons[type];
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
    {children}
  </Dialog.Title>
);

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Dialog.Description as="p" className="text-sm text-gray-500">
    {children}
  </Dialog.Description>
);

export interface IModal extends React.FC<ModalProps> {
  Title: React.FC<{ children: React.ReactNode }>;
  Description: React.FC<{ children: React.ReactNode }>;
}

export const Modal: IModal = ({
  show,
  footer,
  onClose,
  children,
  hideCloseButton,
  type,
}) => {
  const focusRef = React.useRef(null);

  const style = getStyle(type);

  return (
    <Transition.Root show={show} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
        initialFocus={focusRef}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block transform overflow-hidden
            rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            >
              <div
                className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block"
                ref={focusRef}
              >
                {!hideCloseButton && (
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400
                  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => onClose(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {type && style && (
                    <div
                      className={classNames(
                        "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
                        style.bg
                      )}
                    >
                      <style.icon
                        className={classNames("h-6 w-6", style.icon_color)}
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div
                    className={classNames("text-center sm:text-left", {
                      "mt-3 sm:mt-0 sm:ml-4": type,
                    })}
                  >
                    {children}
                  </div>
                </div>
              </div>
              {footer && (
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {footer}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

Modal.Title = Title;
Modal.Description = Description;
