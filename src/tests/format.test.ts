import { formatNumber } from "~/lib/helpers";

describe("formatNumber...", () => {
  test("formats numbers correctlys", () => {
    interface Test {
      input: number;
      expectedOutput: string;
    }

    const tests: Array<Test> = [
      { input: 0, expectedOutput: "0" },
      { input: 12, expectedOutput: "12" },
      { input: -12, expectedOutput: "12" },
      { input: 123, expectedOutput: "123" },
      { input: -123, expectedOutput: "123" },
      { input: 1234, expectedOutput: "1 234" },
      { input: -1234, expectedOutput: "1 234" },
      { input: 12345, expectedOutput: "12 345" },
      { input: -12345, expectedOutput: "12 345" },
      { input: 123456, expectedOutput: "123 456" },
      { input: -123456, expectedOutput: "123 456" },
      { input: 1234567, expectedOutput: "1 234 567" },
      { input: -1234567, expectedOutput: "1 234 567" },
      { input: 123456789, expectedOutput: "123 456 789" },
      { input: -123456789, expectedOutput: "123 456 789" },
      { input: 1234567890, expectedOutput: "1 234 567 890" },
      { input: -1234567890, expectedOutput: "1 234 567 890" },
      { input: 118.5, expectedOutput: "118" },
      { input: 4239.00001, expectedOutput: "4 239" },
      { input: -2786.41, expectedOutput: "2 786" },
      { input: -16472639.252341, expectedOutput: "16 472 639" },
    ];

    tests.forEach((t) => {
      expect(formatNumber(t.input)).toBe(t.expectedOutput);
    });
  });
});
