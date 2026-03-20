import React from "react";

import { IncomeDetails } from "~/lib/calculations";

import s from "./style.module.scss";
interface Props {
  label: string;
  id: keyof IncomeDetails;
  value: string;
  list: Array<string>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: Props): React.ReactElement {
  return (
    <div className={s.container}>
      <label htmlFor={props.id}>
        <div className={s.label}>{props.label}</div>
        <select
          className={s.input}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        >
          {props.list.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
