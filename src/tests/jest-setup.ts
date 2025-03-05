expect.extend({
	toEqualInteger(received, expected) {
		if (received === expected) {
			return {
				message: () => `expected ${received} not to be ${expected}`,
				pass: true,
			};
		} else {
			return {
				message: () => `expected ${received} to be ${expected}`,
				pass: false,
			};
		}
	}
});
