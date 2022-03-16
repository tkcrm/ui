import * as React from "react";
import classNames from "classnames";

export type AvatarProps = {
  img?: string;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ className, img, children }) => {
  if (img) {
    return (
      <img
        src={img}
        className={classNames("inline-block rounded-full", className)}
        alt=""
      />
    );
  }
  return (
    <div
      className={classNames(
        `inline-flex items-center justify-center rounded-full
        bg-indigo-600 text-base font-medium text-white`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Avatar;
