import {
  CapitalDeficit,
  DataPayload,
  EgenavgifterRates,
  Karensdagar,
  PGILimits,
  StateIncomeTaxRates,
  TaxableEarnedIncomeReduction,
} from "~/typings/global";
import { getAmountByPercentage, getAmountWithLimit, round } from "./helpers";

export interface PGI {
  employmentIncome: number;
  otherIncome: number;
  taxEmployed: number;
  taxOther: number;
}

export function getPGI(
  pgiLimits: PGILimits,
  salary: number,
  activeIncome: number,
): PGI {
  let availablePGI = 7.5 * pgiLimits.inkomstbasbelopp;
  let availableIncome = round(
    pgiLimits.inkomstbasbelopp * 8.07,
    pgiLimits.incomeCeilingRounding,
  );

  // Round incomes down to nearest hundred and apply limits
  salary = round(Math.min(salary, availableIncome), 100, "down");
  availableIncome -= salary;
  activeIncome = round(Math.min(activeIncome, availableIncome), 100, "down");

  // Calculate taxes
  const taxEmployed = round(salary * -0.07, 100);
  const taxOther = round(activeIncome * -0.07, 100);

  // Calculate PGI
  const employmentIncome = Math.min(salary + taxEmployed, availablePGI);
  availablePGI -= employmentIncome;
  const otherIncome = Math.min(activeIncome + taxOther, availablePGI);

  return {
    employmentIncome,
    otherIncome,
    taxEmployed,
    taxOther,
  };
}

export function getGrundavdrag(
  earnedIncome: number,
  prisbasbelopp: number,
): number {
  let amount: number;

  if (earnedIncome <= 0.423 * prisbasbelopp) {
    return -1 * earnedIncome;
  } else if (earnedIncome <= prisbasbelopp * 0.99) {
    amount = 0.423 * prisbasbelopp;
  } else if (earnedIncome <= prisbasbelopp * 2.72) {
    amount =
      0.423 * prisbasbelopp + (earnedIncome - prisbasbelopp * 0.99) * 0.2;
  } else if (earnedIncome <= prisbasbelopp * 3.11) {
    amount = 0.77 * prisbasbelopp;
  } else if (earnedIncome <= prisbasbelopp * 7.88) {
    amount = 0.77 * prisbasbelopp - (earnedIncome - prisbasbelopp * 3.11) * 0.1;
  } else {
    amount = 0.293 * prisbasbelopp;
  }
  return round(amount * -1, 100, "down");
}

interface Egenavgifter {
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
  egenavgifter: EgenavgifterRates,
  karens: Karensdagar,
): Egenavgifter {
  const deduction =
    totalSelfEmployedIncome > egenavgifter.schablonavdrag.limit
      ? (getAmountByPercentage(
          egenavgifter.schablonavdrag.limit,
          egenavgifter.schablonavdrag.rate,
        ) +
          getAmountByPercentage(
            totalSelfEmployedIncome - egenavgifter.schablonavdrag.limit,
            egenavgifter.schablonavdrag.remainingRate,
          )) *
        -1
      : getAmountByPercentage(
          totalSelfEmployedIncome,
          egenavgifter.schablonavdrag.rate,
        ) * -1;
  const egenavgiftIncome = totalSelfEmployedIncome + deduction;

  const e = {
    deduction,
    healthInsuranceTax:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.healthInsuranceTaxRate[karens],
      ) * -1,
    parentalInsuranceTax:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.parentalInsuranceTaxRate,
      ) * -1,
    retirementPensionTax:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.retirementPensionTaxRate,
      ) * -1,
    survivorsPensionContribution:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.survivorsPensionContributionRate,
      ) * -1,
    labourMarketTax:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.labourMarketTaxRate,
      ) * -1,
    occupationalInjuryTax:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.occupationalInjuryTaxRate,
      ) * -1,
    generalPayrollTax:
      getAmountByPercentage(
        egenavgiftIncome,
        egenavgifter.generalPayrollTaxRate,
      ) * -1,
    reductionForActiveBusiness: getAmountWithLimit(
      activeIncome,
      egenavgifter.reductionForActiveBusiness.rate,
      egenavgifter.reductionForActiveBusiness.limit,
    ),
  };

  return {
    ...e,
    total:
      e.healthInsuranceTax +
      e.parentalInsuranceTax +
      e.retirementPensionTax +
      e.survivorsPensionContribution +
      e.labourMarketTax +
      e.occupationalInjuryTax +
      e.generalPayrollTax +
      e.reductionForActiveBusiness,
  };
}

export function getJobbskatteavdrag(
  income: number,
  grundavdrag: number,
  municipalIncomeTax: number,
  pensionTax: number,
  data: DataPayload,
): number {
  const {
    jobbSkatteavdragRate: rates,
    prisbasbelopp: pbb,
    municipalIncomeTaxRate,
  } = data;
  income = round(income, 100, "down");
  let amount: number;

  if (income <= pbb * rates.breakpoints[0]) {
    amount = ((income + grundavdrag) * municipalIncomeTaxRate) / 100;
  } else if (income <= pbb * rates.breakpoints[1]) {
    amount =
      ((rates.prisbasbeloppAmount[0] * pbb +
        (rates.rate[0] / 100) * (income - pbb * rates.breakpoints[0]) +
        grundavdrag) *
        municipalIncomeTaxRate) /
      100;
  } else if (income <= pbb * rates.breakpoints[2]) {
    amount =
      ((rates.prisbasbeloppAmount[1] * pbb +
        (rates.rate[1] / 100) * (income - pbb * rates.breakpoints[1]) +
        grundavdrag) *
        municipalIncomeTaxRate) /
      100;
  } else if (
    rates.breakpoints.length < 4 ||
    income <= pbb * rates.breakpoints[3]
  ) {
    amount =
      ((rates.prisbasbeloppAmount[2] * pbb + grundavdrag) *
        municipalIncomeTaxRate) /
      100;
  } else {
    amount =
      ((rates.prisbasbeloppAmount[3] * pbb + grundavdrag) *
        municipalIncomeTaxRate) /
        100 -
      0.03 * (income - 13.54 * pbb);
  }

  return Math.floor(Math.min(amount, (municipalIncomeTax - pensionTax) * -1));
}

function getStateIncomeTax(income: number, rates: StateIncomeTaxRates): number {
  let tax = 0;

  for (let i = 0; i < rates.length; i++) {
    if (income > rates[i].threshold) {
      const low = rates[i].threshold;
      let high = income;

      if (rates.length > i + 1 && income > rates[i + 1].threshold) {
        high = rates[i + 1].threshold;
      }

      tax += getAmountByPercentage(high - low, rates[i].rate) * -1;
    }
  }

  return tax;
}

function getTaxableEarnedIncomeReduction(
  income: number,
  rate: TaxableEarnedIncomeReduction,
): number {
  return income < rate.threshold
    ? 0
    : getAmountWithLimit(income - rate.threshold, rate.rate, rate.limit);
}

function getCapitalDeficit(amount: number, rate: CapitalDeficit) {
  if (amount > 0) {
    return 0;
  }

  return amount > rate.limit * -1
    ? getAmountByPercentage(amount, rate.rate) * -1
    : getAmountByPercentage(rate.limit, rate.rate) +
        getAmountByPercentage(amount + rate.limit, rate.remainingRate * -1);
}

export interface IncomeDetails {
  salary: number;
  benefits: number;
  activeIncome: number;
  passiveIncome: number;
  deductibles: number;
  selfEmployedSickPay: number;
  previousClaimedEgenavgift: number;
  previousEgenavgift: number;
  interestDistribution: number;
  periodiseringFond: number;
  capitalIncome: number;
  capitalExpenses: number;
  rutArbete: number;
  karens: Karensdagar;
}

export interface TaxDetails {
  income: {
    earnedIncome: number;
    grundAvdrag: number;
    taxableEarnedIncome: number;
    pensionable: {
      employment: number;
      other: number;
    };
  };
  taxes: {
    municipalIncomeTax: number;
    stateIncomeTax: number;
    stateCapitalTax: number;
    pensionContribution: {
      income: number;
      other: number;
    };
    egenavgifter: Egenavgifter;
    funeralFee: number;
    publicServiceFee: number;
    total: number;
  };
  taxReductions: {
    pensionContribution: number;
    jobbSkatteAvdrag: number;
    taxableEarnedIncomeReduction: number;
    capitalDeficitReduction: number;
    rutArbete: number;
    total: number;
  };
  finalTax: number;
}

export function calculate(i: IncomeDetails, d: DataPayload): TaxDetails {
  // Capital Gain/Loss
  const capitalTotal =
    i.capitalIncome + i.interestDistribution - i.capitalExpenses;
  const stateCapitalTax =
    capitalTotal > 0
      ? getAmountByPercentage(capitalTotal, d.capitalIncomeTaxRate) * -1
      : 0;
  let capitalDeficitReduction = getCapitalDeficit(
    capitalTotal,
    d.capitalDeficit,
  );

  // Egenavgifter
  const totalSelfEmployedIncome =
    i.activeIncome -
    i.deductibles +
    i.passiveIncome -
    i.interestDistribution +
    i.periodiseringFond +
    i.previousClaimedEgenavgift -
    i.previousEgenavgift;
  const egenavgifter = getEgenavgifter(
    totalSelfEmployedIncome,
    i.activeIncome,
    d.egenavgifter,
    i.karens,
  );
  const activeBusinessSurplus =
    totalSelfEmployedIncome + egenavgifter.deduction;

  // Fastställd förvärvsinkomst
  // Salary + self employed income - egenavgift deduction (25%)
  const earnedIncome = round(
    i.salary + i.benefits + activeBusinessSurplus + i.selfEmployedSickPay,
    100,
    "down",
  );

  // varav beskattningsbar förvärvsinkomst
  // Taxable Income (earned income minus grundavdrag)
  const grundAvdrag = getGrundavdrag(earnedIncome, d.prisbasbelopp);
  const taxableEarnedIncome = earnedIncome + grundAvdrag;

  // Pensionsgrundande inkomst
  // Pensionable income for employment and for other gainful employment
  const pension = getPGI(d.pgi, i.salary + i.benefits, activeBusinessSurplus);

  // Kommunal inkomstskatt
  // Municipal Income Tax
  const municipalIncomeTax =
    getAmountByPercentage(taxableEarnedIncome, d.municipalIncomeTaxRate) * -1;

  // Statlig inkomstskatt på förvärvsinkomster
  // State Income Tax
  const stateIncomeTax = getStateIncomeTax(
    taxableEarnedIncome,
    d.stateIncomeTax,
  );

  // Begravningsavgift
  // Funeral Fee
  const funeralFee =
    getAmountByPercentage(taxableEarnedIncome, d.funeralTaxRate) * -1;

  // Public service avgift
  // Radio and TV fee
  const publicServiceFee =
    getAmountWithLimit(
      taxableEarnedIncome,
      d.publicServiceTax.rate,
      d.publicServiceTax.limit,
    ) * -1;

  // Tax Total
  const taxTotal =
    municipalIncomeTax +
    stateIncomeTax +
    stateCapitalTax +
    pension.taxEmployed +
    pension.taxOther +
    egenavgifter.total +
    funeralFee +
    publicServiceFee;

  let avilableTaxReduction =
    municipalIncomeTax * -1 + pension.taxEmployed + pension.otherIncome;
  if (capitalDeficitReduction > avilableTaxReduction) {
    capitalDeficitReduction = avilableTaxReduction;
  }
  avilableTaxReduction -= capitalDeficitReduction;

  // Taxable Earned Income Reduction
  const taxableEarnedIncomeReduction = getTaxableEarnedIncomeReduction(
    taxableEarnedIncome,
    d.taxableEarnedIncomeReduction,
  );

  // Reduction in Municipal Income Tax
  let jobbSkatteAvdrag = getJobbskatteavdrag(
    i.salary + totalSelfEmployedIncome + egenavgifter.deduction,
    grundAvdrag,
    municipalIncomeTax,
    pension.taxEmployed + pension.taxOther,
    d,
  );
  if (jobbSkatteAvdrag * -1 > avilableTaxReduction) {
    jobbSkatteAvdrag = avilableTaxReduction;
  }
  avilableTaxReduction -= capitalDeficitReduction;

  // Tax Reduction Total
  const totalTaxReductions =
    jobbSkatteAvdrag -
    pension.taxEmployed -
    pension.taxOther +
    taxableEarnedIncomeReduction +
    capitalDeficitReduction +
    i.rutArbete;

  // Bottom Line Tax
  const finalTax = taxTotal + totalTaxReductions;

  return {
    income: {
      earnedIncome,
      grundAvdrag,
      taxableEarnedIncome,
      pensionable: {
        employment: pension.employmentIncome,
        other: pension.otherIncome,
      },
    },
    taxes: {
      municipalIncomeTax,
      stateIncomeTax,
      stateCapitalTax,
      pensionContribution: {
        income: pension.taxEmployed,
        other: pension.taxOther,
      },
      egenavgifter,
      funeralFee,
      publicServiceFee,
      total: taxTotal,
    },
    taxReductions: {
      pensionContribution: (pension.taxEmployed + pension.taxOther) * -1,
      jobbSkatteAvdrag,
      taxableEarnedIncomeReduction,
      capitalDeficitReduction,
      rutArbete: i.rutArbete,
      total: totalTaxReductions,
    },
    finalTax,
  };
}
