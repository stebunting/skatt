import { useEffect, useState } from "react";

import { calculate } from "~/lib/calculations";
import { Year } from "~/typings/global";
import data from "~/lib/data.json";


export interface FormInput {
	salary: number;
	activeIncome: number;
	passiveIncome: number;
	previousClaimedEgenavgift: number;
	previousEgenavgift: number;
	capitalIncome: number;
}

export interface CalculatedValues {
	egenavgiftDeduction: number;
	earnedIncome: number;
	grundAvdrag: number;
	taxableIncome: number;
	pensionableEmploymentIncome: number;
	pensionableOtherIncome: number;
	municipalIncomeTax: number;
	capitalIncomeTax: number;

	healthInsuranceTax: number;
	parentalInsuranceTax: number;
	retirementPensionTax: number;
	survivorsPensionContribution: number;
	labourMarketTax: number;
	occupationalInjuryTax: number;
	generalPayrollTax: number;
	reductionForActiveBusiness: number;
	totalEgenavgifter: number;

	pensionTaxEmployed: number;
	pensionTaxOther: number;

	funeralTax: number;
	showPublicServiceTax: boolean;
	publicServiceTax: number;
	totalTax: number;

	employmentTaxDeduction: number;
	totalFinalTax: number;
	totalFinalTaxRate: number;
}

export function useCalculator(initialYear: Year) {
	const [formInput, setFormInput] = useState<FormInput>({
		salary: 392349,
		activeIncome: 401706,
		passiveIncome: -53286,
		previousClaimedEgenavgift: 49869,
		previousEgenavgift: 35592,
		capitalIncome: -23394,
	});
	const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
		egenavgiftDeduction: 0,
		earnedIncome: 0,
		grundAvdrag: 0,
		taxableIncome: 0,
		pensionableEmploymentIncome: 0,
		pensionableOtherIncome: 0,
		municipalIncomeTax: 0,
		capitalIncomeTax: 0,

		healthInsuranceTax: 0,
		parentalInsuranceTax: 0,
		retirementPensionTax: 0,
		survivorsPensionContribution: 0,
		labourMarketTax: 0,
		occupationalInjuryTax: 0,
		generalPayrollTax: 0,
		reductionForActiveBusiness: 0,
		totalEgenavgifter: 0,

		pensionTaxEmployed: 0,
		pensionTaxOther: 0,

		funeralTax: 0,
		showPublicServiceTax: false,
		publicServiceTax: 0,
		totalTax: 0,

		employmentTaxDeduction: 0,
		totalFinalTax: 0,
		totalFinalTaxRate: 0,
	});
	const [year, setYear] = useState<Year>(initialYear);

	useEffect(() => {
		setCalculatedValues((prev) => ({
			...prev,
			...calculate(formInput, data[year]),
		}));
	}, [year, formInput]);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value: valueStr } = event.currentTarget;
		const value = valueStr !== ""
			? parseInt(valueStr.replace(/ /g, ""), 10)
			: 0;
		if (!Number.isNaN(value)) {
			setFormInput({ ...formInput, [id]: value });
		}
	};

	return {
		formInput,
		calculatedValues,
		handleValueChange,
		setYear,
	};
}
