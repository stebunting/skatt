import React, { useEffect } from "react";

import Input from "~/components/Input";
import { Year } from "~/typings/global";

import s from "./style.module.scss";
import { useCalculator } from "./useCalculator";

interface Props {
  year: Year;
}

export default function Calculator(props: Props): React.ReactElement {
  const { formInput, calculatedValues, handleValueChange, setYear } =
    useCalculator(props.year);

  useEffect(() => setYear(props.year), [props.year, setYear]);

  return (
    <div>
      <h2>Taxable Income</h2>
      <div className={s.group}>
        <Input
          id="salary"
          label="Salary"
          value={formInput.salary}
          onChange={handleValueChange}
        />
        <Input
          id="benefits"
          label="Income from Benefits, Sick Pay etc."
          value={formInput.benefits}
          onChange={handleValueChange}
        />
        <Input
          id="capitalIncome"
          label="Capital Income"
          value={formInput.capitalIncome}
          onChange={handleValueChange}
        />
        <Input
          id="capitalExpenses"
          label="Capital Expenses"
          value={formInput.capitalExpenses}
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
          id="deductibles"
          label="Deductibles"
          value={formInput.deductibles}
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
          id="interestDistribution"
          label="Interest Distribution"
          value={formInput.interestDistribution}
          onChange={handleValueChange}
        />
        <Input
          id="egenavgiftDeduction"
          label="Egenavgift Deduction"
          value={calculatedValues.taxes.egenavgifter.deduction}
        />
        <Input
          id="rutArbete"
          label="Rut/Rot Work"
          value={formInput.rutArbete}
          onChange={handleValueChange}
        />
        <Input
          id="selfEmployedSickPay"
          label="Self Employed Sick Pay"
          value={formInput.selfEmployedSickPay}
          onChange={handleValueChange}
        />
      </div>

      <div className={s.group}>
        <Input
          id="earnedIncome"
          label="Earned Income"
          value={calculatedValues.income.earnedIncome}
        />
        <Input
          id="grundAvdrag"
          label="Grundavdrag"
          value={calculatedValues.income.grundAvdrag}
        />
        <Input
          id="taxableIncome"
          label="Taxable Income"
          value={calculatedValues.income.taxableEarnedIncome}
        />
      </div>

      <h2>Pensionable Income</h2>
      <div className={s.group}>
        <Input
          id="pensionableEmploymentIncome"
          label="Employment Income"
          value={calculatedValues.income.pensionable.employment}
        />
        <Input
          id="pensionableOtherIncome"
          label="Other Income"
          value={calculatedValues.income.pensionable.other}
        />
      </div>

      <h2>Tax</h2>
      <div className={s.group}>
        <Input
          id="municipalIncomeTax"
          label="Municipal Income Tax"
          value={calculatedValues.taxes.municipalIncomeTax}
        />
        <Input
          id="stateIncomeTax"
          label="State Income Tax"
          value={calculatedValues.taxes.stateIncomeTax}
        />
        {calculatedValues.taxes.stateCapitalTax < 0 && (
          <Input
            id="capitalIncomeTax"
            label="Capital Income Tax"
            value={calculatedValues.taxes.stateCapitalTax}
          />
        )}
      </div>

      <h3>Egenavgifter</h3>
      <div className={s.group}>
        <Input
          id="healthInsuranceTax"
          label="Health Insurance Tax"
          value={calculatedValues.taxes.egenavgifter.healthInsuranceTax}
          subCalculation
        />
        <Input
          id="parentalInsuranceTax"
          label="Parental Insurance Tax"
          value={calculatedValues.taxes.egenavgifter.parentalInsuranceTax}
          subCalculation
        />
        <Input
          id="retirementPensionTax"
          label="Retirement Pension Tax"
          value={calculatedValues.taxes.egenavgifter.retirementPensionTax}
          subCalculation
        />
        <Input
          id="survivorsPensionContribution"
          label="Survivors Pension Contribution"
          value={
            calculatedValues.taxes.egenavgifter.survivorsPensionContribution
          }
          subCalculation
        />
        <Input
          id="labourMarketTax"
          label="Labour Market Tax"
          value={calculatedValues.taxes.egenavgifter.labourMarketTax}
          subCalculation
        />
        <Input
          id="occupationalInjuryTax"
          label="Occupational Injury Tax"
          value={calculatedValues.taxes.egenavgifter.occupationalInjuryTax}
          subCalculation
        />
        <Input
          id="generalPayrollTax"
          label="General Payroll Tax"
          value={calculatedValues.taxes.egenavgifter.generalPayrollTax}
          subCalculation
        />
        <Input
          id="reductionForActiveBusiness"
          label="Reduction for Active Business"
          value={calculatedValues.taxes.egenavgifter.reductionForActiveBusiness}
          subCalculation
        />
        <Input
          id="totalEgenavgifter"
          label="Total"
          value={calculatedValues.taxes.egenavgifter.total}
        />
      </div>

      <div className={s.group}>
        <Input
          id="pensionTaxEmployed"
          label="Pensions Tax (Employment)"
          value={calculatedValues.taxes.pensionContribution.income}
        />
        <Input
          id="pensionTaxOther"
          label="Pensions Tax (Other)"
          value={calculatedValues.taxes.pensionContribution.other}
        />
        <Input
          id="funeralTax"
          label="Funeral Tax"
          value={calculatedValues.taxes.funeralFee}
        />
        {calculatedValues.taxes.publicServiceFee && (
          <Input
            id="publicServiceTax"
            label="Public Service Tax"
            value={calculatedValues.taxes.publicServiceFee}
          />
        )}
      </div>

      <div className={s.group}>
        <Input
          id="totalTax"
          label="Total"
          value={calculatedValues.taxes.total}
        />
      </div>

      <h2>Reductions</h2>
      <div className={s.group}>
        <Input
          id="pensionTaxDeduction"
          label="Pension Contribution Deduction"
          value={calculatedValues.taxReductions.pensionContribution}
        />
        <Input
          id="employmentTaxDeduction"
          label="Employment Tax Deduction (Jobbskatteavdrag)"
          value={calculatedValues.taxReductions.jobbSkatteAvdrag}
        />
        <Input
          id="taxableEarnedIncomeReduction"
          label="Taxable Earned Income Reduction"
          value={calculatedValues.taxReductions.taxableEarnedIncomeReduction}
        />
        {calculatedValues.taxReductions.capitalDeficitReduction > 0 && (
          <Input
            id="capitalIncomeTax"
            label="Capital Tax Deficit"
            value={calculatedValues.taxReductions.capitalDeficitReduction}
          />
        )}
        {calculatedValues.taxReductions.rutArbete > 0 && (
          <Input
            id="rutArbete"
            label="Rot/Rut Work"
            value={calculatedValues.taxReductions.rutArbete}
          />
        )}
        <Input
          id="totalTaxReductions"
          label="Total Reductions"
          value={calculatedValues.taxReductions.total}
        />
      </div>

      <div className={s.group}>
        <Input
          id="totalFinalTax"
          label="Total Final Tax"
          value={calculatedValues.finalTax}
        />
        {/* <Input
					id="totalFinalTaxRate"
					label="Total Final Tax Rate"
					value={calculatedValues.totalFinalTaxRate}
					symbol="%"
				/> */}
      </div>
    </div>
  );
}
