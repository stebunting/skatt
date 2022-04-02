import { DataPayload } from "~/typings/global";
import { FormInput } from "~/views/IndexView/Calculator/useCalculator";

export function getAmountByPercentage(
	gross: number,
	percentage: number,
): number {
	const amount = gross * percentage / 100;
	return amount > 0 ? Math.floor(amount) : Math.ceil(amount);
}

interface PensionReturnPayload {
	employmentIncome: number;
	otherIncome: number;
	taxEmployed: number;
	taxOther: number;
}

export function getPension(
	inkomstbasbelopp: number,
	salary: number,
	activeIncome: number,
): PensionReturnPayload {
	let availablePGI = inkomstbasbelopp * 7.5;
	let availablePensionTax = roundHundred(inkomstbasbelopp * (7.5 / 0.93) * -0.07, "down");

	let taxEmployed = roundHundred(salary * -0.07);
	if (taxEmployed < availablePensionTax) {
		taxEmployed = availablePensionTax;
	}
	availablePensionTax -= taxEmployed;

	let taxOther = roundHundred(activeIncome * -0.07);
	if (taxOther < availablePensionTax) {
		taxOther = availablePensionTax;
	}

	let employmentIncome = roundHundred(salary - (salary * 0.07), "down");
	if (employmentIncome > availablePGI) {
		employmentIncome = availablePGI;
	}
	availablePGI -= employmentIncome;

	let otherIncome = roundHundred(activeIncome - (activeIncome * 0.07), "down");
	if (otherIncome > availablePGI) {
		otherIncome = availablePGI;
	}

	return {
		taxEmployed,
		taxOther,
		employmentIncome,
		otherIncome,
	};
}

export function getGrundavdrag(
	income: number,
	prisbasbelopp: number,
): number {
	let amount: number;

	if (income <= 0.423 * prisbasbelopp) {
		return -1 * income;
	} else if (income <= prisbasbelopp * 0.99) {
		amount = 0.423 * prisbasbelopp;

	} else if (income <= prisbasbelopp * 2.72) {
		amount = 0.423 * prisbasbelopp + (income - prisbasbelopp * 0.99) * 0.2;

	} else if (income <= prisbasbelopp * 3.11) {
		amount = 0.77 * prisbasbelopp;

	} else if (income <= prisbasbelopp * 7.88) {
		amount = 0.77 * prisbasbelopp - (income - prisbasbelopp * 3.11) * 0.1;

	} else {
		amount = 0.293 * prisbasbelopp;
	}
	return -1 * Math.ceil(amount / 100) * 100;
}

interface EgenAvgiftReturnPayload {
	deduction: number;
	healthInsuranceTax: number;
	parentalInsuranceTax: number;
	retirementPensionTax: number;
	survivorsPensionContribution: number;
	labourMarketTax: number;
	occupationalInjuryTax: number;
	generalPayrollTax: number;
	reductionForActiveBusiness: number;
	total: number;
}

export function getEgenavgifter(
	totalSelfEmployedIncome: number,
	activeIncome: number,
	d: DataPayload,
): EgenAvgiftReturnPayload {
	const egenavgiftDeduction = getAmountByPercentage(totalSelfEmployedIncome, d.schablonavdrag) * -1;
	const egenavgiftIncome = totalSelfEmployedIncome + egenavgiftDeduction;

	const e = {
		healthInsuranceTax: getAmountByPercentage(egenavgiftIncome, d.deductibles.healthInsuranceTaxRate) * -1,
		parentalInsuranceTax: getAmountByPercentage(egenavgiftIncome, d.deductibles.parentalInsuranceTaxRate) * -1,
		retirementPensionTax: getAmountByPercentage(egenavgiftIncome, d.deductibles.retirementPensionTaxRate) * -1,
		survivorsPensionContribution: getAmountByPercentage(egenavgiftIncome, d.deductibles.survivorsPensionContributionRate) * -1,
		labourMarketTax: getAmountByPercentage(egenavgiftIncome, d.deductibles.labourMarketTaxRate) * -1,
		occupationalInjuryTax: getAmountByPercentage(egenavgiftIncome, d.deductibles.occupationalInjuryTaxRate) * -1,
		generalPayrollTax: getAmountByPercentage(egenavgiftIncome, d.deductibles.generalPayrollTaxRate) * -1,
		reductionForActiveBusiness: getAmountWithLimit(activeIncome, d.reductionForActiveBusiness.rate, d.reductionForActiveBusiness.limit),
	};

	return {
		...e,
		deduction: egenavgiftDeduction,
		total: e.healthInsuranceTax + e.parentalInsuranceTax + e.retirementPensionTax + e.survivorsPensionContribution + e.labourMarketTax + e.occupationalInjuryTax + e.generalPayrollTax + e.reductionForActiveBusiness,
	};
}

export function getAmountWithLimit(
	gross: number,
	percentage: number,
	limit: number,
): number {
	const amount = Math.floor(gross * percentage / 100);
	return amount > limit ? limit : amount;
}

export function getJobbskatteavdrag(
	income: number,
	grundavdrag: number,
	data: DataPayload,
): number {
	const {
		jobbSkatteavdragRate: rates,
		prisbasbelopp,
		municipalIncomeTaxRate,
	} = data;

	let amount: number;
	if (income <= prisbasbelopp * rates.breakpoints[0]) {
		amount = (income + grundavdrag) * municipalIncomeTaxRate / 100;

	} else if (income <= prisbasbelopp * rates.breakpoints[1]) {
		amount = (rates.prisbasbeloppAmount[0] * prisbasbelopp + (rates.rate[0] / 100) * (income - prisbasbelopp * rates.breakpoints[0]) + grundavdrag) * municipalIncomeTaxRate / 100;

	} else if (income <= prisbasbelopp * rates.breakpoints[2]) {
		amount = (rates.prisbasbeloppAmount[1] * prisbasbelopp + (rates.rate[1] / 100) * (income - prisbasbelopp * rates.breakpoints[1]) + grundavdrag) * municipalIncomeTaxRate / 100;

	} else if (income <= prisbasbelopp * rates.breakpoints[3]) {
		amount = (rates.prisbasbeloppAmount[2] * prisbasbelopp + grundavdrag) * municipalIncomeTaxRate / 100;

	} else {
		amount = ((rates.prisbasbeloppAmount[3] * prisbasbelopp + grundavdrag) * municipalIncomeTaxRate / 100) - (0.03 * (income - 13.54 * prisbasbelopp));
	}

	return Math.round(amount);
}

export function roundHundred(
	n: number,
	direction?: "up" | "down",
) {
	if (direction === "up") {
		return Math.ceil(n / 100) * 100;
	} else if (direction === "down") {
		return Math.floor(n / 100) * 100;
	}

	return Math.round(n / 100) * 100;
}

export function calculate(formInput: FormInput, d: DataPayload) {
	const { salary, activeIncome, passiveIncome, capitalIncome, previousEgenavgift, previousClaimedEgenavgift } = formInput;
	const totalSelfEmployedIncome = activeIncome + passiveIncome + previousClaimedEgenavgift - previousEgenavgift;

	const egenavgifter = getEgenavgifter(totalSelfEmployedIncome, activeIncome, d);

	const earnedIncome = roundHundred(salary + totalSelfEmployedIncome + egenavgifter.deduction, "down");
	const grundAvdrag = getGrundavdrag(earnedIncome, d.prisbasbelopp);
	const taxableIncome = earnedIncome + grundAvdrag;

	const pension = getPension(d.inkomstbasbelopp, salary, activeIncome);

	const municipalIncomeTax = getAmountByPercentage(taxableIncome, d.municipalIncomeTaxRate) * -1;
	const capitalIncomeTax = getAmountByPercentage(capitalIncome, d.capitalIncomeTaxRate) * -1;

	const funeralTax = getAmountByPercentage(taxableIncome, d.funeralTaxRate) * -1;
	const showPublicServiceTax = d.publicServiceTax.rate > 0;
	const publicServiceTax = getAmountWithLimit(taxableIncome, d.publicServiceTax.rate, d.publicServiceTax.limit) * -1;
	const totalTax = municipalIncomeTax + pension.taxEmployed + pension.taxOther + egenavgifter.total + funeralTax + publicServiceTax;

	const employmentTaxDeduction = getJobbskatteavdrag(activeIncome, grundAvdrag, d);
	const totalFinalTax = totalTax + employmentTaxDeduction + capitalIncomeTax;
	const totalFinalTaxRate = -100 * totalFinalTax / (salary + activeIncome + passiveIncome + capitalIncome);

	return {
		egenavgiftDeduction: egenavgifter.deduction,
		earnedIncome,
		grundAvdrag,
		taxableIncome,
		pensionableEmploymentIncome: pension.employmentIncome,
		pensionableOtherIncome:pension.otherIncome,
		municipalIncomeTax,
		capitalIncomeTax,
		healthInsuranceTax: egenavgifter.healthInsuranceTax,
		parentalInsuranceTax: egenavgifter. parentalInsuranceTax,
		retirementPensionTax: egenavgifter.retirementPensionTax,
		survivorsPensionContribution: egenavgifter.survivorsPensionContribution,
		labourMarketTax: egenavgifter.labourMarketTax,
		occupationalInjuryTax: egenavgifter.occupationalInjuryTax,
		generalPayrollTax: egenavgifter.generalPayrollTax,
		reductionForActiveBusiness: egenavgifter.reductionForActiveBusiness,
		totalEgenavgifter: egenavgifter.total,
		pensionTaxEmployed: pension.taxEmployed,
		pensionTaxOther: pension.taxOther,
		funeralTax,
		showPublicServiceTax,
		publicServiceTax,
		totalTax,
		employmentTaxDeduction,
		totalFinalTax,
		totalFinalTaxRate,
	};
}
