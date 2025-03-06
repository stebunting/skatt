import React from "react";
import { Year } from "~/typings/global";

import data from "~/lib/data.json";
import { formatNumber, round } from "~/lib/helpers";

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
        {formatNumber(d.pgi.inkomstbasbelopp)} kr
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
        {formatNumber(d.pgi.inkomstbasbelopp * 7.5)} kr
      </div>
      <div>
        <strong>Maximum Pension Tax: </strong>
        {formatNumber(
          round(d.pgi.inkomstbasbelopp * (7.5 / 0.93) * 0.07, 100),
        )}{" "}
        kr
      </div>

      <h2>Egenavgift</h2>
      <div>
        <strong>Health Insurance Tax Rate: </strong>
        {d.egenavgifter.healthInsuranceTaxRate}%
      </div>
      <div>
        <strong>Parental Insurance Tax Rate: </strong>
        {d.egenavgifter.parentalInsuranceTaxRate}%
      </div>
      <div>
        <strong>Retirement Pension Tax Rate: </strong>
        {d.egenavgifter.retirementPensionTaxRate}%
      </div>
      <div>
        <strong>Survivors Pension Contribution Rate: </strong>
        {d.egenavgifter.survivorsPensionContributionRate}%
      </div>
      <div>
        <strong>Labour Market Tax Rate: </strong>
        {d.egenavgifter.labourMarketTaxRate}%
      </div>
      <div>
        <strong>Occupational Injury Tax Rate: </strong>
        {d.egenavgifter.occupationalInjuryTaxRate}%
      </div>
      <div>
        <strong>General Payroll Tax Rate: </strong>
        {d.egenavgifter.generalPayrollTaxRate}%
      </div>
      <div>
        <strong>Reduction for active business: </strong>
        {d.egenavgifter.reductionForActiveBusiness.rate}% (
        {formatNumber(d.egenavgifter.reductionForActiveBusiness.limit)} kr
        Limit)
      </div>

      <h2>Other</h2>
      <div>
        <strong>Funeral Tax Rate: </strong>
        {d.funeralTaxRate}%
      </div>
      {d.publicServiceTax.rate > 0 && (
        <div>
          <strong>Public Service Tax Rate: </strong>
          {d.publicServiceTax.rate}% ({formatNumber(d.publicServiceTax.limit)}{" "}
          kr Limit)
        </div>
      )}
    </div>
  );
}
