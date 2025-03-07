import {
  getGrundavdrag,
  getJobbskatteavdrag,
  getPGI,
  PGI,
} from "~/lib/calculations";
import { Year } from "~/typings/global";
import * as data from "~/lib/data.json";
import { round } from "~/lib/helpers";

describe("calculations...", () => {
  test("rounds to 100", () => {
    interface Test {
      input: number;
      direction?: "up" | "down";
      expectedOutput: number;
    }

    const tests: Array<Test> = [
      {
        input: 452,
        expectedOutput: 500,
      },
      {
        input: 449,
        expectedOutput: 400,
      },
      {
        input: 54675,
        direction: "up",
        expectedOutput: 54700,
      },
      {
        input: 54675,
        direction: "down",
        expectedOutput: 54600,
      },
    ];

    tests.forEach((t) => {
      expect(round(t.input, 100, t.direction)).toBe(t.expectedOutput);
    });
  });

  test("calculate jobbSkatteAvdrag", () => {
    interface Test {
      year: Year;
      income: number;
      municipalIncomeTax: number;
      jobbSkatteAvdrag: number;
    }

    const tests: Array<Test> = [
      {
        year: "2023",
        income: 842706,
        municipalIncomeTax: -254424,
        jobbSkatteAvdrag: 29526,
      },
    ];

    tests.forEach((t) => {
      const d = data[t.year];
      const grundAvdrag = getGrundavdrag(t.income, d.prisbasbelopp);

      expect(
        getJobbskatteavdrag(t.income, grundAvdrag, t.municipalIncomeTax, d),
      ).toEqual(t.jobbSkatteAvdrag);
    });
  });

  test("calculate pension", () => {
    interface Test {
      year: Year;
      salary: number;
      activeIncome: number;
      pension: PGI;
    }

    const tests: Array<Test> = [
      {
        year: "2024",
        salary: 510000,
        activeIncome: 0,
        pension: {
          employmentIncome: 474300,
          otherIncome: 0,
          taxEmployed: -35700,
          taxOther: 0,
        },
      },
      {
        year: "2024",
        salary: 697000,
        activeIncome: 0,
        pension: {
          employmentIncome: 571500,
          otherIncome: 0,
          taxEmployed: -43000,
          taxOther: 0,
        },
      },
      {
        year: "2023",
        salary: 510000,
        activeIncome: 0,
        pension: {
          employmentIncome: 474300,
          otherIncome: 0,
          taxEmployed: -35700,
          taxOther: 0,
        },
      },
      {
        year: "2023",
        salary: 697000,
        activeIncome: 0,
        pension: {
          employmentIncome: 557250,
          otherIncome: 0,
          taxEmployed: -42000,
          taxOther: 0,
        },
      },
      {
        year: "2022",
        salary: 510000,
        activeIncome: 0,
        pension: {
          employmentIncome: 474300,
          otherIncome: 0,
          taxEmployed: -35700,
          taxOther: 0,
        },
      },
      {
        year: "2022",
        salary: 697000,
        activeIncome: 0,
        pension: {
          employmentIncome: 532500,
          otherIncome: 0,
          taxEmployed: -40100,
          taxOther: 0,
        },
      },
      {
        year: "2021",
        salary: 510000,
        activeIncome: 0,
        pension: {
          employmentIncome: 474300,
          otherIncome: 0,
          taxEmployed: -35700,
          taxOther: 0,
        },
      },
      {
        year: "2021",
        salary: 697000,
        activeIncome: 0,
        pension: {
          employmentIncome: 511500,
          otherIncome: 0,
          taxEmployed: -38500,
          taxOther: 0,
        },
      },
      {
        year: "2020",
        salary: 510000,
        activeIncome: 0,
        pension: {
          employmentIncome: 474300,
          otherIncome: 0,
          taxEmployed: -35700,
          taxOther: 0,
        },
      },
      {
        year: "2020",
        salary: 697000,
        activeIncome: 0,
        pension: {
          employmentIncome: 501000,
          otherIncome: 0,
          taxEmployed: -37700,
          taxOther: 0,
        },
      },
      {
        year: "2019",
        salary: 494300,
        activeIncome: 0,
        pension: {
          employmentIncome: 459700,
          otherIncome: 0,
          taxEmployed: -34600,
          taxOther: 0,
        },
      },
      {
        year: "2019",
        salary: 697000,
        activeIncome: 0,
        pension: {
          employmentIncome: 483000,
          otherIncome: 0,
          taxEmployed: -36400,
          taxOther: 0,
        },
      },
      {
        year: "2018",
        salary: 494300,
        activeIncome: 0,
        pension: {
          employmentIncome: 459700,
          otherIncome: 0,
          taxEmployed: -34600,
          taxOther: 0,
        },
      },
      {
        year: "2018",
        salary: 597000,
        activeIncome: 0,
        pension: {
          employmentIncome: 468750,
          otherIncome: 0,
          taxEmployed: -35300,
          taxOther: 0,
        },
      },
      {
        year: "2017",
        salary: 494300,
        activeIncome: 0,
        pension: {
          employmentIncome: 459700,
          otherIncome: 0,
          taxEmployed: -34600,
          taxOther: 0,
        },
      },
      {
        year: "2017",
        salary: 497000,
        activeIncome: 0,
        pension: {
          employmentIncome: 461250,
          otherIncome: 0,
          taxEmployed: -34700,
          taxOther: 0,
        },
      },
      {
        year: "2016",
        salary: 477800,
        activeIncome: 0,
        pension: {
          employmentIncome: 444400,
          otherIncome: 0,
          taxEmployed: -33400,
          taxOther: 0,
        },
      },
      {
        year: "2016",
        salary: 490000,
        activeIncome: 0,
        pension: {
          employmentIncome: 444750,
          otherIncome: 0,
          taxEmployed: -33500,
          taxOther: 0,
        },
      },
    ];

    tests.forEach((t) => {
      const pgi = data[t.year].pgi;
      const p = getPGI(pgi, t.salary, t.activeIncome);

      expect(p.employmentIncome).toEqualInteger(t.pension.employmentIncome);
      expect(p.taxEmployed).toEqualInteger(t.pension.taxEmployed);
    });
  });

  test("calculate Grundavdrag", () => {
    interface Test {
      year: Year;
      income: number;
      grundavdrag: number;
    }

    const tests: Array<Test> = [
      {
        year: "2024",
        income: 178200,
        grundavdrag: -44200,
      },
      {
        year: "2024",
        income: 49500,
        grundavdrag: -24300,
      },
      {
        year: "2024",
        income: 99200,
        grundavdrag: -32800,
      },
      {
        year: "2024",
        income: 198400,
        grundavdrag: -42200,
      },
      {
        year: "2024",
        income: 224600,
        grundavdrag: -39500,
      },
      {
        year: "2024",
        income: 301000,
        grundavdrag: -31900,
      },
      {
        year: "2024",
        income: 378600,
        grundavdrag: -24100,
      },
      {
        year: "2024",
        income: 1467800,
        grundavdrag: -16800,
      },
      {
        year: "2023",
        income: 150000,
        grundavdrag: -40500,
      },
      {
        year: "2022",
        income: 80200,
        grundavdrag: -27000,
      },
      {
        year: "2022",
        income: 80600,
        grundavdrag: -27000,
      },
      {
        year: "2022",
        income: 80700,
        grundavdrag: -27100,
      },
      {
        year: "2021",
        income: 146500,
        grundavdrag: -36700,
      },
      {
        year: "2021",
        income: 267400,
        grundavdrag: -24800,
      },
      {
        year: "2021",
        income: 374500,
        grundavdrag: -14100,
      },
      {
        year: "2019",
        income: 287500,
        grundavdrag: -21600,
      },
      {
        year: "2019",
        income: 24500,
        grundavdrag: -19700,
      },
      {
        year: "2019",
        income: 178200,
        grundavdrag: -32500,
      },
    ];

    tests.forEach((t) => {
      const pbb = data[t.year].prisbasbelopp;
      expect(getGrundavdrag(t.income, pbb)).toBe(t.grundavdrag);
    });
  });
});
