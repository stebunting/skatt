import React, { useEffect, useRef } from "react";

import Caret from "../Caret";
import { classes } from "~/lib/classes";

import s from "./style.module.scss";

interface Props {
  name: string;
  open?: boolean;
  collapsible?: boolean;
  children: React.ReactNode;
}

export default function Header(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState(
    (props.open || !props.collapsible) ?? false,
  );

  useEffect(() => {
    if (contentRef.current && props.collapsible) {
      contentRef.current.style.maxHeight = visible
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [visible, props.collapsible, props.children]);

  return (
    <>
      <div className={s.header}>
        <h2>{props.name}</h2>
        {props.collapsible && (
          <button
            onClick={() => (props.collapsible ? setVisible(!visible) : null)}
          >
            <Caret down={visible} />
          </button>
        )}
      </div>
      <div
        ref={contentRef}
        className={classes({
          [s.children]: true,
          [s.open]: visible,
          [s.closed]: !visible,
        })}
      >
        {props.children}
      </div>
    </>
  );
}
