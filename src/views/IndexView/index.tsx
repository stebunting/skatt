import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import data from "~/lib/data.json";
import { Year } from "~/typings/global";

import Calculator from "./Calculator";
import Overview from "./Overview";
import s from "./style.module.scss";


export default function IndexView(): React.ReactElement {
	const location = useLocation();

	const years = (Object.keys(data) as Array<Year>).sort((a, b) => b.localeCompare(a));
	const [year, setYear] = useState<Year>(years[0]);

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
						<option key={year} value={year}>{year}</option>
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
