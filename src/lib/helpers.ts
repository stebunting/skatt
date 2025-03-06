export function getAmountWithLimit(
  gross: number,
  percentage: number,
  limit: number,
): number {
  return Math.min(limit, Math.floor((gross * percentage) / 100));
}

export function getAmountByPercentage(
  gross: number,
  percentage: number,
): number {
  const amount = (gross * percentage) / 100;
  return amount > 0 ? Math.floor(amount) : Math.ceil(amount);
}

export function round(n: number, multiple: number, direction?: "up" | "down") {
  if (direction === "up") {
    return Math.ceil(n / multiple) * multiple;
  } else if (direction === "down") {
    return Math.floor(n / multiple) * multiple;
  }

  return Math.round(n / multiple) * multiple;
}

export const formatNumber = (n: number): string => {
  const recurse = (str: string): string => {
    if (str.length <= 3) {
      return str;
    }
    return `${recurse(str.slice(0, str.length - 3))} ${str.slice(str.length - 3)}`;
  };

  return recurse(Math.abs(n > 0 ? Math.floor(n) : Math.ceil(n)).toString());
};
