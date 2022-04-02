import { classes } from "~/lib/classes";

describe("classes...", () => {
	test("creates correct string", () => {
		interface Test {
			input: { [key: string]: boolean };
			expectedOutput: string;
		}

		const tests: Array<Test> = [{
			input: {
				a: true,
				b: true,
			},
			expectedOutput: "a b",
		}, {
			input: {
				someStr: false,
				ahfjenj7whejf: true,
			},
			expectedOutput: "ahfjenj7whejf",
		}, {
			input: {
				18647: true,
				223412: false,
			},
			expectedOutput: "18647",
		}, {
			input: {},
			expectedOutput: "",
		}, {
			input: {
				a: false,
				b: false,
				c: false,
				d: false,
			},
			expectedOutput: "",
		}, {
			input: {
				a: true,
				b: false,
				c: true,
				d: true,
			},
			expectedOutput: "a c d",
		}];

		tests.forEach((t) => {
			expect(classes(t.input)).toBe(t.expectedOutput);
		});
	});
});
