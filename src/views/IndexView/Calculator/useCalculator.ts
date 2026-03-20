import { useEffect, useReducer, useState } from "react";

import { readFromLocalStorage, writeToLocalStorage } from "~/lib/persistence";
import { IncomeDetails, TaxDetails, calculate } from "~/lib/calculations";
import { Karensdagar, Year } from "~/typings/global";
import data from "~/lib/data.json";

export function useCalculator(initialYear: Year) {
  const formInitialState: IncomeDetails = {
    salary: 0,
    benefits: 0,
    activeIncome: 0,
    passiveIncome: 0,
    deductibles: 0,
    selfEmployedSickPay: 0,
    previousClaimedEgenavgift: 0,
    previousEgenavgift: 0,
    interestDistribution: 0,
    periodiseringFond: 0,
    capitalIncome: 0,
    capitalExpenses: 0,
    rutArbete: 0,
    karens: "7" as Karensdagar,
  };

  const initForm = () => {
    const ls = readFromLocalStorage("formInput");
    return ls ? ls : formInitialState;
  };

  const inputReducer = (
    state: IncomeDetails,
    action: Partial<IncomeDetails>,
  ): IncomeDetails => {
    writeToLocalStorage("formInput", { ...state, ...action });
    return { ...state, ...action };
  };
  const [formInput, setIncomeDetails] = useReducer(
    inputReducer,
    formInitialState,
    initForm,
  );

  const [calculatedValues, setCalculatedValues] = useState<TaxDetails>({
    income: {
      earnedIncome: 0,
      grundAvdrag: 0,
      taxableEarnedIncome: 0,
      pensionable: {
        employment: 0,
        other: 0,
      },
    },
    taxes: {
      municipalIncomeTax: 0,
      stateIncomeTax: 0,
      stateCapitalTax: 0,
      pensionContribution: {
        income: 0,
        other: 0,
      },
      egenavgifter: {
        deduction: 0,
        healthInsuranceTax: 0,
        parentalInsuranceTax: 0,
        retirementPensionTax: 0,
        survivorsPensionContribution: 0,
        labourMarketTax: 0,
        occupationalInjuryTax: 0,
        generalPayrollTax: 0,
        reductionForActiveBusiness: 0,
        total: 0,
      },
      funeralFee: 0,
      publicServiceFee: 0,
      total: 0,
    },
    taxReductions: {
      pensionContribution: 0,
      jobbSkatteAvdrag: 0,
      taxableEarnedIncomeReduction: 0,
      capitalDeficitReduction: 0,
      rutArbete: 0,
      total: 0,
    },
    finalTax: 0,
  });
  const [year, setYear] = useState<Year>(initialYear);

  useEffect(() => {
    setCalculatedValues((prev) => ({
      ...prev,
      ...calculate(formInput, data[year]),
    }));
  }, [year, formInput]);

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value: valueStr } = event.currentTarget;
    const value =
      valueStr !== "" ? parseInt(valueStr.replace(/ /g, ""), 10) : 0;
    if (!Number.isNaN(value)) {
      setIncomeDetails({ [id]: value });
    }
  };

  return {
    formInput,
    calculatedValues,
    handleValueChange,
    setYear,
  };
}
