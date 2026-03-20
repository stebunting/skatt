import { IncomeDetails, TaxDetails } from "~/lib/calculations";

export interface DataPayload {
  prisbasbelopp: number;
  pgi: PGILimits;
  municipalIncomeTaxRate: number;
  stateIncomeTax: StateIncomeTaxRates;
  capitalIncomeTaxRate: number;
  egenavgifter: EgenavgifterRates;
  funeralTaxRate: number;
  publicServiceTax: {
    rate: number;
    limit: number;
  };
  taxableEarnedIncomeReduction: TaxableEarnedIncomeReduction;
  jobbSkatteavdragRate: {
    breakpoints: Array<number>;
    rate: Array<number>;
    prisbasbeloppAmount: Array<number>;
  };
  capitalDeficit: CapitalDeficit;
}

export interface PGILimits {
  inkomstbasbelopp: number;
  incomeCeilingRounding: number;
}

export type Karensdagar = "1" | "7" | "14" | "30" | "60" | "90";

export interface EgenavgifterRates {
  schablonavdrag: {
    rate: number;
    limit: number;
    remainingRate: number;
  };
  healthInsuranceTaxRate: Record<Karensdagar, number>;
  parentalInsuranceTaxRate: number;
  retirementPensionTaxRate: number;
  survivorsPensionContributionRate: number;
  labourMarketTaxRate: number;
  occupationalInjuryTaxRate: number;
  generalPayrollTaxRate: number;
  reductionForActiveBusiness: {
    rate: number;
    limit: number;
  };
}

export type StateIncomeTaxRates = Array<{
  rate: number;
  threshold: number;
}>;

export interface TaxableEarnedIncomeReduction {
  rate: number;
  threshold: number;
  limit: number;
}

export interface CapitalDeficit {
  rate: number;
  limit: number;
  remainingRate: number;
}

export type Year =
  | "2016"
  | "2017"
  | "2018"
  | "2019"
  | "2020"
  | "2021"
  | "2022"
  | "2023"
  | "2024"
  | "2025"
  | "2026";

declare module "data.json" {
  const value: Record<Year, DataPayload>;
  export default value;
}

declare module "test.data.json" {
  const value: Array<{
    year: Year;
    incomeDetails: IncomeDetails;
    taxDetails: TaxDetails;
  }>;
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
      toEqualInteger(received: number): R;
    }
  }
}
