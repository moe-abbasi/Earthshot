export const rateConverter = (num: number): number => {
	const clampedNum = Math.min(Math.max(num, 0), 100);
	return (clampedNum / 100) * 5;
};
