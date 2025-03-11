import React, { useEffect, useState } from "react";

import { classes } from "~/lib/classes";
import { IncomeDetails } from "~/lib/calculations";
import { formatNumber } from "~/lib/helpers";

import s from "./style.module.scss";

interface InputProps {
  label: string;
  id: keyof IncomeDetails;
  value: number;
  fixed?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CalculatedProps {
  label: string;
  id: string;
  value: number;
  fixed?: boolean;
  subCalculation?: boolean;
}

export default function Input(
  props: InputProps | CalculatedProps,
): React.ReactElement {
  const isInput = "onChange" in props;
  const fixed = "fixed" in props;

  const [value, setValue] = useState(formatNumber(props.value));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (isInput) {
      props.onChange(event);
    }
  };

  useEffect(() => setValue(formatNumber(props.value)), [props.value]);

  return props.value !== 0 || fixed ? (
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
          value={value}
          onChange={handleChange}
          onFocus={() => value === "0" && setValue("")}
          onBlur={() => setValue(formatNumber(props.value))}
          readOnly={!isInput}
        />
      </label>
    </div>
  ) : (
    <></>
  );
}
