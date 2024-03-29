import * as React from "react";
import Notice from "./Notice";
import type Notification from "./Notification";
import type { NoticeContent, NoticeFunc } from "./Notification";

export default function useNotification(
  notificationInstance: Notification
): [NoticeFunc, React.ReactElement] {
  const createdRef = React.useRef<Record<React.Key, React.ReactElement>>({});
  const [elements, setElements] = React.useState<React.ReactElement[]>([]);

  function notify(noticeProps: NoticeContent) {
    let firstMount = true;
    notificationInstance.add(noticeProps, (div, props) => {
      const { key } = props;

      if (div && (!createdRef.current[key] || firstMount)) {
        const noticeEle = <Notice {...props} holder={div} />;
        createdRef.current[key] = noticeEle;

        setElements((originElements) => {
          const index = originElements.findIndex((ele) => ele.key === key);

          if (index === -1) {
            return [...originElements, noticeEle];
          }

          const cloneList = [...originElements];
          cloneList[index] = noticeEle;
          return cloneList;
        });
      }

      firstMount = false;
    });
  }

  return [notify, <>{elements}</>];
}
