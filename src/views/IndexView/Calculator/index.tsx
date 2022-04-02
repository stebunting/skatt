import React, { useEffect } from "react";

import Input from "~/components/Input";
import { Year } from "~/typings/global";

import s from "./style.module.scss";
import { useCalculator } from "./useCalculator";


interface Props {
	year: Year;
}

export default function Calculator(props: Props): React.ReactElement {
	const {
		formInput,
		calculatedValues,
		handleValueChange,
		setYear,
	} = useCalculator(props.year);

	useEffect(() => setYear(props.year), [props.year, setYear]);

	return (
		<div>
			<h2>Taxable Income</h2>
			<div className={s.group}>
				<Input
					id="salary"
					label="Income from Salary, Benefits, Sick Pay etc."
					value={formInput.salary}
					onChange={handleValueChange}
				/>
				<Input
					id="capitalIncome"
					label="Capital Income"
					value={formInput.capitalIncome}
					onChange={handleValueChange}
				/>
			</div>

			<div className={s.group}>
				<Input
					id="activeIncome"
					label="Income from Active Verksamhet"
					value={formInput.activeIncome}
					onChange={handleValueChange}
				/>
				<Input
					id="passiveIncome"
					label="Income from Passive Verksamhet"
					value={formInput.passiveIncome}
					onChange={handleValueChange}
				/>
				<Input
					id="previousClaimedEgenavgift"
					label="Previous Claimed Egenavgift"
					value={formInput.previousClaimedEgenavgift}
					onChange={handleValueChange}
				/>
				<Input
					id="previousEgenavgift"
					label="Previous Paid Egenavgift"
					value={formInput.previousEgenavgift}
					onChange={handleValueChange}
				/>
				<Input
					id="egenavgiftDeduction"
					label="Egenavgift Deduction"
					value={calculatedValues.egenavgiftDeduction}
				/>
			</div>

			<div className={s.group}>
				<Input
					id="earnedIncome"
					label="Earned Income"
					value={calculatedValues.earnedIncome}
				/>
				<Input
					id="grundAvdrag"
					label="Grundavdrag"
					value={calculatedValues.grundAvdrag}
				/>
				<Input
					id="taxableIncome"
					label="Taxable Income"
					value={calculatedValues.taxableIncome}
				/>
			</div>

			<h2>Pensionable Income</h2>
			<div className={s.group}>
				<Input
					id="pensionableEmploymentIncome"
					label="Employment Income"
					value={calculatedValues.pensionableEmploymentIncome}
				/>
				<Input
					id="pensionableOtherIncome"
					label="Other Income"
					value={calculatedValues.pensionableOtherIncome}
				/>
			</div>

			<h2>Tax</h2>
			<div className={s.group}>
				<Input
					id="municipalIncomeTax"
					label="Municipal Income Tax"
					value={calculatedValues.municipalIncomeTax}
				/>
				{calculatedValues.capitalIncomeTax < 0 && (
					<Input
						id="capitalIncomeTax"
						label="Capital Income Tax"
						value={calculatedValues.capitalIncomeTax}
					/>
				)}
			</div>

			<h3>Egenavgifter</h3>
			<div className={s.group}>
				<Input
					id="healthInsuranceTax"
					label="Health Insurance Tax"
					value={calculatedValues.healthInsuranceTax}
					subCalculation
				/>
				<Input
					id="parentalInsuranceTax"
					label="Parental Insurance Tax"
					value={calculatedValues.parentalInsuranceTax}
					subCalculation
				/>
				<Input
					id="retirementPensionTax"
					label="Retirement Pension Tax"
					value={calculatedValues.retirementPensionTax}
					subCalculation
				/>
				<Input
					id="survivorsPensionContribution"
					label="Survivors Pension Contribution"
					value={calculatedValues.survivorsPensionContribution}
					subCalculation
				/>
				<Input
					id="labourMarketTax"
					label="Labour Market Tax"
					value={calculatedValues.labourMarketTax}
					subCalculation
				/>
				<Input
					id="occupationalInjuryTax"
					label="Occupational Injury Tax"
					value={calculatedValues.occupationalInjuryTax}
					subCalculation
				/>
				<Input
					id="generalPayrollTax"
					label="General Payroll Tax"
					value={calculatedValues.generalPayrollTax}
					subCalculation
				/>
				<Input
					id="reductionForActiveBusiness"
					label="Reduction for Active Business"
					value={calculatedValues.reductionForActiveBusiness}
					subCalculation
				/>
				<Input
					id="totalEgenavgifter"
					label="Total"
					value={calculatedValues.totalEgenavgifter}
				/>
			</div>

			<div className={s.group}>
				<Input
					id="pensionTaxEmployed"
					label="Pensions Tax (Employment)"
					value={calculatedValues.pensionTaxEmployed}
				/>
				<Input
					id="pensionTaxOther"
					label="Pensions Tax (Other)"
					value={calculatedValues.pensionTaxOther}
				/>
				<Input
					id="funeralTax"
					label="Funeral Tax"
					value={calculatedValues.funeralTax}
				/>
				{calculatedValues.showPublicServiceTax && (
					<Input
						id="publicServiceTax"
						label="Public Service Tax"
						value={calculatedValues.publicServiceTax}
					/>
				)}
			</div>

			<div className={s.group}>
				<Input
					id="totalTax"
					label="Total"
					value={calculatedValues.totalTax}
				/>
			</div>

			<h2>Reductions</h2>
			<div className={s.group}>
				<Input
					id="employmentTaxDeduction"
					label="Employment Tax Deduction (Jobbskatteavdrag)"
					value={calculatedValues.employmentTaxDeduction}
				/>
				{calculatedValues.capitalIncomeTax > 0 && (
					<Input
						id="capitalIncomeTax"
						label="Capital Tax Deficit"
						value={calculatedValues.capitalIncomeTax}
					/>
				)}
			</div>

			<div className={s.group}>
				<Input
					id="totalFinalTax"
					label="Total Final Tax"
					value={calculatedValues.totalFinalTax}
				/>
				<Input
					id="totalFinalTaxRate"
					label="Total Final Tax Rate"
					value={calculatedValues.totalFinalTaxRate}
					symbol="%"
				/>
			</div>
		</div>
	);
}
