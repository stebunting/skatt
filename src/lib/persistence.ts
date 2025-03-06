import { IncomeDetails } from "./calculations";

export type Keys = "formInput" | "year";

export function writeToLocalStorage(key: Keys, data: IncomeDetails | string) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function readFromLocalStorage(key: Keys) {
	const ls = localStorage.getItem(key);
	return ls ? JSON.parse(ls) : null;
}
