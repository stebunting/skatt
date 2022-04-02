import React from "react";
import { Year } from "~/typings/global";

import data from "~/lib/data.json";
import { formatNumber } from "~/lib/format";
import { roundHundred } from "~/lib/calculations";


interface Props {
	year: Year;
}

export default function Overview(props: Props): React.ReactElement {
	const d = data[props.year];

	return (
		<div>
			<h2>Tax Rates</h2>
			<div>
				<strong>Prisbasbelopp: </strong>
				{formatNumber(d.prisbasbelopp)} kr
			</div>
			<div>
				<strong>Inkomstbasbelopp: </strong>
				{formatNumber(d.inkomstbasbelopp)} kr
			</div>
			<div>
				<strong>Municipal Income Tax Rate: </strong>
				{d.municipalIncomeTaxRate}%
			</div>
			<div>
				<strong>Capital Income Tax Rate: </strong>
				{d.capitalIncomeTaxRate}%
			</div>

			<h2>Pension</h2>
			<div>
				<strong>Maximum Pensionable Income: </strong>
				{formatNumber(d.inkomstbasbelopp * 7.5)} kr
			</div>
			<div>
				<strong>Maximum Pension Tax: </strong>
				{formatNumber(roundHundred(d.inkomstbasbelopp * (7.5 / 0.93) * 0.07))} kr
			</div>

			<h2>Egenavgift</h2>
			<div>
				<strong>Health Insurance Tax Rate: </strong>
				{d.deductibles.healthInsuranceTaxRate}%
			</div>
			<div>
				<strong>Parental Insurance Tax Rate: </strong>
				{d.deductibles.parentalInsuranceTaxRate}%
			</div>
			<div>
				<strong>Retirement Pension Tax Rate: </strong>
				{d.deductibles.retirementPensionTaxRate}%
			</div>
			<div>
				<strong>Survivors Pension Contribution Rate: </strong>
				{d.deductibles.survivorsPensionContributionRate}%
			</div>
			<div>
				<strong>Labour Market Tax Rate: </strong>
				{d.deductibles.labourMarketTaxRate}%
			</div>
			<div>
				<strong>Occupational Injury Tax Rate: </strong>
				{d.deductibles.occupationalInjuryTaxRate}%
			</div>
			<div>
				<strong>General Payroll Tax Rate: </strong>
				{d.deductibles.generalPayrollTaxRate}%
			</div>
			<div>
				<strong>Reduction for active business: </strong>
				{d.reductionForActiveBusiness.rate}%
				({formatNumber(d.reductionForActiveBusiness.limit)} kr Limit)
			</div>

			<h2>Other</h2>
			<div>
				<strong>Funeral Tax Rate: </strong>
				{d.funeralTaxRate}%
			</div>
			{d.publicServiceTax.rate > 0 && (
				<div>
					<strong>Public Service Tax Rate: </strong>
					{d.publicServiceTax.rate}%
					({formatNumber(d.publicServiceTax.limit)} kr Limit)
				</div>
			)}
		</div>
	);
}
