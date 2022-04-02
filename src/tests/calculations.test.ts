import { roundHundred } from "~/lib/calculations";

describe("calculations...", () => {
	test("rounds to 100", () => {
		interface Test {
			input: number;
			direction?: "up" | "down";
			expectedOutput: number;
		}

		const tests: Array<Test> = [{
			input: 452,
			expectedOutput: 500,
		}, {
			input: 449,
			expectedOutput: 400,
		}, {
			input: 54675,
			direction: "up",
			expectedOutput: 54700,
		}, {
			input: 54675,
			direction: "down",
			expectedOutput: 54600,
		}];

		tests.forEach((t) => {
			expect(roundHundred(t.input, t.direction)).toBe(t.expectedOutput);
		});
	});
});
