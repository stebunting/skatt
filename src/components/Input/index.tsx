import React from "react";

import { classes } from "~/lib/classes";
import { IncomeDetails } from "~/lib/calculations";
import { formatNumber } from "~/lib/helpers";

import s from "./style.module.scss";

interface InputProps {
  label: string;
  id: keyof IncomeDetails;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CalculatedProps {
  label: string;
  id: string;
  value: number;
  symbol?: string;
  subCalculation?: boolean;
}

export default function Input(
  props: InputProps | CalculatedProps,
): React.ReactElement {
  const isInput = "onChange" in props;
  const symbol = "symbol" in props;

  return (
    <div className={s.container}>
      <label htmlFor={props.id}>
        <div className={s.label}>{props.label}</div>
        <input
          className={classes({
            [s.input]: true,
            [s.userInput]: isInput,
            [s.negative]: props.value < 0,
            [s.subCalculation]: !isInput && props.subCalculation,
          })}
          type="text"
          id={props.id}
          value={`${formatNumber(props.value)}${symbol ? props.symbol : ""}`}
          onChange={isInput ? props.onChange : undefined}
          readOnly={!isInput}
        />
      </label>
    </div>
  );
}
