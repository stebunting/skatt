import React, { useReducer } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { readFromLocalStorage, writeToLocalStorage } from "~/lib/persistence";
import { Year } from "~/typings/global";
import data from "~/lib/data.json";

import Calculator from "./Calculator";
import Overview from "./Overview";
import s from "./style.module.scss";

export default function IndexView(): React.ReactElement {
  const location = useLocation();

  const years = (Object.keys(data) as Array<Year>).sort((a, b) =>
    b.localeCompare(a),
  );

  const yearReducer = (_: Year, action: Year) => {
    writeToLocalStorage("year", action);
    return action;
  };

  const initYear = () => {
    const ls = readFromLocalStorage("year");
    return ls ? ls : years[0];
  };

  const [year, setYear] = useReducer(yearReducer, years[0], initYear);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setYear(value as Year);
  };

  return (
    <div className={s.container}>
      <h1>Swedish Tax Calculator</h1>

      <div className={s.yearSelector}>
        <div>
          <Link to={location.pathname === "/" ? "/overview" : "/"}>
            <button>
              {location.pathname === "/" ? "Overview" : "Calculator"}
            </button>
          </Link>
        </div>

        <select defaultValue={year} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Routes>
        <Route path="/" element={<Calculator year={year} />} />
        <Route path="/overview" element={<Overview year={year} />} />
      </Routes>
    </div>
  );
}
