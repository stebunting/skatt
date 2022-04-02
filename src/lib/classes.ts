export function classes(args: { [key: string]: boolean | undefined }): string {
	return Object.entries(args).reduce((a, [key, value]) => {
		if (value === true) {
			a.push(key);
		}
		return a;
	}, [] as Array<string>).join(" ");
}
