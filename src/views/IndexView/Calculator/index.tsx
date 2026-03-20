import React, { useEffect } from "react";

import Input from "~/components/Input";
import { Year } from "~/typings/global";
import { useCalculator } from "./useCalculator";
import Header from "~/components/Header";
import Select from "~/components/Select";
import data from "~/lib/data.json";

import s from "./style.module.scss";

interface Props {
  year: Year;
}

export default function Calculator(props: Props): React.ReactElement {
  const { formInput, calculatedValues, handleValueChange, setYear } =
    useCalculator(props.year);

  useEffect(() => setYear(props.year), [props.year, setYear]);

  const karensDagar = Object.keys(
    data[props.year].egenavgifter.healthInsuranceTaxRate,
  );

  return (
    <div>
      <Header name="Taxable Income" open collapsible>
        <div className={s.group}>
          <Input
            id="salary"
            label="Salary"
            value={formInput.salary}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="benefits"
            label="Income from Benefits, Sick Pay etc."
            value={formInput.benefits}
            fixed
            onChange={handleValueChange}
          />
        </div>
        <div className={s.group}>
          <Input
            id="capitalIncome"
            label="Capital Income"
            value={formInput.capitalIncome}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="capitalExpenses"
            label="Capital Expenses"
            value={formInput.capitalExpenses}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="rutArbete"
            label="Rut/Rot Work"
            value={formInput.rutArbete}
            fixed
            onChange={handleValueChange}
          />
        </div>

        <div className={s.group}>
          <Input
            id="activeIncome"
            label="Income from Active Verksamhet"
            value={formInput.activeIncome}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="passiveIncome"
            label="Income from Passive Verksamhet"
            value={formInput.passiveIncome}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="deductibles"
            label="Deductibles"
            value={formInput.deductibles}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="previousClaimedEgenavgift"
            label="Previous Claimed Egenavgift"
            value={formInput.previousClaimedEgenavgift}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="previousEgenavgift"
            label="Previous Paid Egenavgift"
            value={formInput.previousEgenavgift}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="interestDistribution"
            label="Interest Distribution"
            value={formInput.interestDistribution}
            fixed
            onChange={handleValueChange}
          />
          <Input
            id="egenavgiftDeduction"
            label="Egenavgift Deduction"
            value={calculatedValues.taxes.egenavgifter.deduction}
          />
          <Input
            id="selfEmployedSickPay"
            label="Self Employed Sick Pay"
            value={formInput.selfEmployedSickPay}
            fixed
            onChange={handleValueChange}
          />
          <Select
            id="karens"
            label="Karens Dagar"
            value={formInput.karens}
            list={karensDagar}
            onChange={handleValueChange}
          />
        </div>
      </Header>

      <div className={s.group}>
        <Input
          id="earnedIncome"
          label="Earned Income"
          fixed
          value={calculatedValues.income.earnedIncome}
        />
        <Input
          id="grundAvdrag"
          label="Grundavdrag"
          fixed
          value={calculatedValues.income.grundAvdrag}
        />
        <Input
          id="taxableIncome"
          label="Taxable Income"
          fixed
          value={calculatedValues.income.taxableEarnedIncome}
        />
      </div>

      <Header name="Pensionable Income">
        <div className={s.group}>
          <Input
            id="pensionableEmploymentIncome"
            label="Employment Income"
            fixed
            value={calculatedValues.income.pensionable.employment}
          />
          <Input
            id="pensionableOtherIncome"
            label="Other Income"
            fixed
            value={calculatedValues.income.pensionable.other}
          />
        </div>
      </Header>

      <Header name="Tax">
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
          <Input
            id="capitalIncomeTax"
            label="Capital Income Tax"
            value={calculatedValues.taxes.stateCapitalTax}
          />
        </div>
      </Header>

      {calculatedValues.taxes.egenavgifter.total !== 0 && (
        <Header name="Egenavgifter" collapsible>
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
              value={
                calculatedValues.taxes.egenavgifter.reductionForActiveBusiness
              }
              subCalculation
            />
          </div>
        </Header>
      )}

      <div className={s.group}>
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
        <Input
          id="publicServiceTax"
          label="Public Service Tax"
          value={calculatedValues.taxes.publicServiceFee}
        />
      </div>

      <div className={s.group}>
        <Input
          id="totalTax"
          label="Total"
          fixed
          value={calculatedValues.taxes.total}
        />
      </div>

      <Header name="Reductions">
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
          <Input
            id="capitalIncomeTax"
            label="Capital Tax Deficit"
            value={calculatedValues.taxReductions.capitalDeficitReduction}
          />
          <Input
            id="rutArbete"
            label="Rot/Rut Work"
            value={calculatedValues.taxReductions.rutArbete}
          />
          <Input
            id="totalTaxReductions"
            label="Total Reductions"
            fixed
            value={calculatedValues.taxReductions.total}
          />
        </div>
      </Header>

      <Header name="Total">
        <div className={s.group}>
          <Input
            id="totalFinalTax"
            label="Total Final Tax"
            fixed
            value={calculatedValues.finalTax}
          />
        </div>
      </Header>
    </div>
  );
}
