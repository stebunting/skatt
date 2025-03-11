import React from "react";

import { classes } from "~/lib/classes";

import s from "./style.module.scss";

interface Props {
  down: boolean;
}

export default function Caret(props: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes({
        [s.caret]: true,
        [s.up]: props.down === false,
        [s.down]: props.down === true,
      })}
    >
      <path
        d="M19.1416 9.92896L12.7776 16.2929C12.3871 16.6834 11.7539 16.6834 11.3634 16.2929L4.99946 9.92895"
        strokeLinecap="round"
      />
    </svg>
  );
}
