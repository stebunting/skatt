import { calculate, IncomeDetails } from "~/lib/calculations";
import * as data from "~/lib/data.json";
import { Year } from "~/typings/global";

import * as tests from "./test.data.json";

describe("cases", () => {
  test("are correct", () => {
    tests.forEach((t) => {
      if (t.year === "2020") {
        return;
      }
      const d = data[t.year as Year];
      const c = calculate(t.incomeDetails as IncomeDetails, d);

      expect(c.income.earnedIncome).toEqualInteger(
        t.taxDetails.income.earnedIncome,
      );
      expect(c.income.grundAvdrag).toEqualInteger(
        t.taxDetails.income.grundAvdrag,
      );
      expect(c.income.taxableEarnedIncome).toEqualInteger(
        t.taxDetails.income.taxableEarnedIncome,
      );
      expect(c.income.pensionable.employment).toEqualInteger(
        t.taxDetails.income.pensionable.employment,
      );
      expect(c.income.pensionable.other).toEqualInteger(
        t.taxDetails.income.pensionable.other,
      );
      expect(c.taxes.municipalIncomeTax).toEqualInteger(
        t.taxDetails.taxes.municipalIncomeTax,
      );
      expect(c.taxes.stateIncomeTax).toEqualInteger(
        t.taxDetails.taxes.stateIncomeTax,
      );
      expect(c.taxes.stateCapitalTax).toEqualInteger(
        t.taxDetails.taxes.stateCapitalTax,
      );
      expect(c.taxes.pensionContribution.income).toEqualInteger(
        t.taxDetails.taxes.pensionContribution.income,
      );
      expect(c.taxes.pensionContribution.other).toEqualInteger(
        t.taxDetails.taxes.pensionContribution.other,
      );

      expect(c.taxes.egenavgifter.deduction).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.deduction,
      );
      expect(c.taxes.egenavgifter.healthInsuranceTax).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.healthInsuranceTax,
      );
      expect(c.taxes.egenavgifter.parentalInsuranceTax).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.parentalInsuranceTax,
      );
      expect(c.taxes.egenavgifter.retirementPensionTax).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.retirementPensionTax,
      );
      expect(c.taxes.egenavgifter.survivorsPensionContribution).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.survivorsPensionContribution,
      );
      expect(c.taxes.egenavgifter.labourMarketTax).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.labourMarketTax,
      );
      expect(c.taxes.egenavgifter.occupationalInjuryTax).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.occupationalInjuryTax,
      );
      expect(c.taxes.egenavgifter.generalPayrollTax).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.generalPayrollTax,
      );
      expect(c.taxes.egenavgifter.reductionForActiveBusiness).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.reductionForActiveBusiness,
      );
      expect(c.taxes.egenavgifter.total).toEqualInteger(
        t.taxDetails.taxes.egenavgifter.total,
      );

      expect(c.taxes.funeralFee).toEqualInteger(t.taxDetails.taxes.funeralFee);
      expect(c.taxes.publicServiceFee).toEqualInteger(
        t.taxDetails.taxes.publicServiceFee,
      );
      expect(c.taxes.total).toEqualInteger(t.taxDetails.taxes.total);

      expect(c.taxReductions.pensionContribution).toEqualInteger(
        t.taxDetails.taxReductions.pensionContribution,
      );
      expect(c.taxReductions.jobbSkatteAvdrag).toEqualInteger(
        t.taxDetails.taxReductions.jobbSkatteAvdrag,
      );
      expect(c.taxReductions.taxableEarnedIncomeReduction).toEqualInteger(
        t.taxDetails.taxReductions.taxableEarnedIncomeReduction,
      );
      expect(c.taxReductions.capitalDeficitReduction).toEqualInteger(
        t.taxDetails.taxReductions.capitalDeficitReduction,
      );
      expect(c.taxReductions.rutArbete).toEqualInteger(
        t.taxDetails.taxReductions.rutArbete,
      );
      expect(c.taxReductions.total).toEqualInteger(
        t.taxDetails.taxReductions.total,
      );

      expect(c.finalTax).toEqualInteger(t.taxDetails.finalTax);
    });
  });
});
