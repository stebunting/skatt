import { getEgenavgifter, getGrundavdrag, getPension } from "~/lib/calculations";
import * as data from "~/lib/data.json";

import { DataPayload, Year } from "~/typings/global";


describe("cases", () => {
	test("are correct", () => {
		interface Test {
			year: Year;
			salary: number;
			activeIncome: number;
			passiveIncome: number;
			previousEgenAvgift: number;
			actualEgenAvgift: number;
			grundAvdrag: number;
			pension: {
				employedIncome: number;
				otherIncome: number;
				employedTax: number;
				otherTax: number;
			};
			egenavgifter: number;
		}

		const tests: Array<Test> = [{
			year: "2023",
			salary: 25894,
			activeIncome: 1076665,
			passiveIncome: 0,
			previousEgenAvgift: 244898,
			actualEgenAvgift: 197838,
			grundAvdrag: -15400,
			pension: {
				employedIncome: 24000,
				otherIncome: 533250,
				employedTax: -1800,
				otherTax: -40200,
			},
			egenavgifter: -229153,
		}, {
			year: "2022",
			salary: 41161,
			activeIncome: 952722,
			passiveIncome: 0,
			previousEgenAvgift: 90674,
			actualEgenAvgift: 63803,
			grundAvdrag: -14200,
			pension: {
				employedIncome: 38200,
				otherIncome: 494300,
				employedTax: -2900,
				otherTax: -37200,
			},
			egenavgifter: -197838,
		}, {
			year: "2021",
			salary: 392349,
			activeIncome: 401706,
			passiveIncome: -53286,
			previousEgenAvgift: 49869,
			actualEgenAvgift: 35592,
			grundAvdrag: -14000,
			pension: {
				employedIncome: 364800,
				otherIncome: 146700,
				employedTax: -27500,
				otherTax: -11100,
			},
			egenavgifter: -63803,
		}, {
			year: "2020",
			salary: 45777,
			activeIncome: 142145,
			passiveIncome: 90911,
			previousEgenAvgift: 138157,
			actualEgenAvgift: 105068,
			grundAvdrag: -23000,
			pension: {
				employedIncome: 42500,
				otherIncome: 219300,
				employedTax: -3300,
				otherTax: -16400,
			},
			egenavgifter: -35592,
		}];
		
		tests.forEach((t) => {
			const income = t.salary + t.activeIncome;
			const totalSelfEmployedIncome = t.activeIncome + t.passiveIncome + t.previousEgenAvgift - t.actualEgenAvgift;
			const pension = getPension(data[t.year].inkomstbasbelopp, t.salary, t.activeIncome + t.passiveIncome);
			const egenavgifter = getEgenavgifter(totalSelfEmployedIncome, t.activeIncome, data[t.year]);

			expect(getGrundavdrag(income, data[t.year].prisbasbelopp)).toEqual(t.grundAvdrag);
			expect(pension.employmentIncome).toEqual(t.pension.employedIncome);
			// expect(pension.otherIncome).toEqual(t.pension.otherIncome);
			// expect(pension.taxEmployed).toEqual(t.pension.employedTax);
			// expect(pension.taxOther).toEqual(t.pension.otherTax);
			// expect(egenavgifter.total).toEqual(t.egenavgifter);
		})
	});
});
