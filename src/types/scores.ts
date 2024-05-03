export type ScoresResponse = {
	status: string;
	message: string;
	scores: Scores;
};

export type Scores = Record<string, number>;

export type ScoresByCountryAPI = {
	message: string;
	posts: ScoresByCountryPosts[];
	status: string;
};

export type ScoresByCountryPosts = {
	comment: string;
	last_update: string;
	id: string;
	country: string;
	user: string;
	score: number;
	product: string;
};
