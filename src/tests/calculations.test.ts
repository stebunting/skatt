import {
	getGrundavdrag,
	getJobbskatteavdrag,
	getPGI,
	PGI
} from "~/lib/calculations";
import { Year } from "~/typings/global";
import * as data from "~/lib/data.json";
import { round } from "~/lib/helpers";

describe("calculations...", () => {
	test("rounds to 100", () => {
		interface Test {
			input: number;
			direction?: "up" | "down";
			expectedOutput: number;
		}

		const tests: Array<Test> = [{
			input: 452,
			expectedOutput: 500,
		}, {
			input: 449,
			expectedOutput: 400,
		}, {
			input: 54675,
			direction: "up",
			expectedOutput: 54700,
		}, {
			input: 54675,
			direction: "down",
			expectedOutput: 54600,
		}];

		tests.forEach((t) => {
			expect(round(t.input, 100, t.direction)).toBe(t.expectedOutput);
		});
	});

	test("calculate jobbSkatteAvdrag", () => {
		interface Test {
			year: Year;
			income: number;
			municipalIncomeTax: number;
			jobbSkatteAvdrag: number;
		}

		const tests: Array<Test> = [{
			year: "2023",
			income: 842706,
			municipalIncomeTax: -254424,
			jobbSkatteAvdrag: 29526,
		}];

		tests.forEach((t) => {
			const d = data[t.year];
			const grundAvdrag = getGrundavdrag(t.income, d.prisbasbelopp);

			expect(getJobbskatteavdrag(t.income, grundAvdrag, t.municipalIncomeTax, d)).toEqual(t.jobbSkatteAvdrag);
		})
	});

	test("calculate pension", () => {
		interface Test {
			year: Year;
			salary: number;
			activeIncome: number;
			pension: PGI;
		}

		const tests: Array<Test> = [{
			year: "2024",
			salary: 510000,
			activeIncome: 0,
			pension: {
				employmentIncome: 474300,
				otherIncome: 0,
				taxEmployed: -35700,
				taxOther: 0,
			},
		}, {
			year: "2024",
			salary: 697000,
			activeIncome: 0,
			pension: {
				employmentIncome: 571500,
				otherIncome: 0,
				taxEmployed: -43000,
				taxOther: 0,
			},
		}, {
			year: "2023",
			salary: 510000,
			activeIncome: 0,
			pension: {
				employmentIncome: 474300,
				otherIncome: 0,
				taxEmployed: -35700,
				taxOther: 0,
			},
		}, {
			year: "2023",
			salary: 697000,
			activeIncome: 0,
			pension: {
				employmentIncome: 557250,
				otherIncome: 0,
				taxEmployed: -42000,
				taxOther: 0,
			},
		}, {
			year: "2022",
			salary: 510000,
			activeIncome: 0,
			pension: {
				employmentIncome: 474300,
				otherIncome: 0,
				taxEmployed: -35700,
				taxOther: 0,
			},
		}, {
			year: "2022",
			salary: 697000,
			activeIncome: 0,
			pension: {
				employmentIncome: 532500,
				otherIncome: 0,
				taxEmployed: -40100,
				taxOther: 0,
			},
		}, {
			year: "2021",
			salary: 510000,
			activeIncome: 0,
			pension: {
				employmentIncome: 474300,
				otherIncome: 0,
				taxEmployed: -35700,
				taxOther: 0,
			},
		}, {
			year: "2021",
			salary: 697000,
			activeIncome: 0,
			pension: {
				employmentIncome: 511500,
				otherIncome: 0,
				taxEmployed: -38500,
				taxOther: 0,
			},
		}, {
			year: "2020",
			salary: 510000,
			activeIncome: 0,
			pension: {
				employmentIncome: 474300,
				otherIncome: 0,
				taxEmployed: -35700,
				taxOther: 0,
			},
		}, {
			year: "2020",
			salary: 697000,
			activeIncome: 0,
			pension: {
				employmentIncome: 501000,
				otherIncome: 0,
				taxEmployed: -37700,
				taxOther: 0,
			},
		}, {
			year: "2019",
			salary: 494300,
			activeIncome: 0,
			pension: {
				employmentIncome: 459700,
				otherIncome: 0,
				taxEmployed: -34600,
				taxOther: 0,
			},
		}, {
			year: "2019",
			salary: 697000,
			activeIncome: 0,
			pension: {
				employmentIncome: 483000,
				otherIncome: 0,
				taxEmployed: -36400,
				taxOther: 0,
			},
		}, {
			year: "2018",
			salary: 494300,
			activeIncome: 0,
			pension: {
				employmentIncome: 459700,
				otherIncome: 0,
				taxEmployed: -34600,
				taxOther: 0,
			},
		}, {
			year: "2018",
			salary: 597000,
			activeIncome: 0,
			pension: {
				employmentIncome: 468750,
				otherIncome: 0,
				taxEmployed: -35300,
				taxOther: 0,
			},
		}, {
			year: "2017",
			salary: 494300,
			activeIncome: 0,
			pension: {
				employmentIncome: 459700,
				otherIncome: 0,
				taxEmployed: -34600,
				taxOther: 0,
			},
		}, {
			year: "2017",
			salary: 497000,
			activeIncome: 0,
			pension: {
				employmentIncome: 461250,
				otherIncome: 0,
				taxEmployed: -34700,
				taxOther: 0,
			},
		}, {
			year: "2016",
			salary: 477800,
			activeIncome: 0,
			pension: {
				employmentIncome: 444400,
				otherIncome: 0,
				taxEmployed: -33400,
				taxOther: 0,
			},
		}, {
			year: "2016",
			salary: 490000,
			activeIncome: 0,
			pension: {
				employmentIncome: 444750,
				otherIncome: 0,
				taxEmployed: -33500,
				taxOther: 0,
			},
		}];

		tests.forEach((t) => {
			const pgi = data[t.year].pgi;
			const p = getPGI(pgi, t.salary, t.activeIncome);

			expect(p.employmentIncome).toEqualInteger(t.pension.employmentIncome);
			expect(p.taxEmployed).toEqualInteger(t.pension.taxEmployed);
		})
	})


});
