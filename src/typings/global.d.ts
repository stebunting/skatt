export interface DataPayload {
	schablonavdrag: number;
	prisbasbelopp: number;
	inkomstbasbelopp: number;
	municipalIncomeTaxRate: number;
	capitalIncomeTaxRate: number;
	deductibles: {
		healthInsuranceTaxRate: number;
		parentalInsuranceTaxRate: number;
		retirementPensionTaxRate: number;
		survivorsPensionContributionRate: number;
		labourMarketTaxRate: number;
		occupationalInjuryTaxRate: number;
		generalPayrollTaxRate: number;
	},
	reductionForActiveBusiness: {
		rate: number;
		limit: number;
	},
	funeralTaxRate: number,
	publicServiceTax: {
			rate: number;
			limit: number;
	},
	jobbSkatteavdragRate: {
		breakpoints: Array<number>;
		rate: Array<number>;
		prisbasbeloppAmount: Array<number>;
	},
}

export type Year = "2016" | "2017" | "2018" | "2019" | "2020" | "2021" | "2022" | "2023" | "2024";

declare module "data.json" {
	const value: Record<Year, DataPayload>;
	export default value;
}

declare module "*.png" {
	const value: string;
	export default value;
}

declare module "*.svg" {
	const value: string;
	export default value;
}

declare module "*.jpg" {
	const value: string;
	export default value;
}

declare module "*.jpeg" {
	const value: string;
	export default value;
}

declare module "*.gif" {
	const value: string;
	export default value;
}

declare global {
	namespace jest {
		interface Matchers<R> {
			toEqualInteger(received: number): CustomMatcherResult;
		}
	}
}
