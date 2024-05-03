export function mapScoreToColor(score: number) {
	score = Math.min(Math.max(score, 0), 100);

	const normalizedScore = score / 100;

	const red = Math.round(255 * (1 - normalizedScore));
	const green = Math.round(255 * normalizedScore);
	const blue = 0;

	const color = `rgb(${red}, ${green}, ${blue})`;
	return color;
}
