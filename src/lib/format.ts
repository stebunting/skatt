export const formatNumber = (n: number): string => {
	const recurse = (str: string): string => {
		if (str.length <= 3) {
			return str;
		}
		return `${recurse(str.slice(0, str.length - 3))} ${str.slice(str.length - 3)}`;
	};

	return recurse(Math.abs(n > 0 ? Math.floor(n) : Math.ceil(n)).toString());
};
