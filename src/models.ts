interface DelegateData {
	contributions: {
		count: number;
		last: number;
		status: string;
	};
	isClaimed: boolean;
	isPrivate: boolean;
	name: string;
	payout: {
		percentage: number;
		interval: number;
		minimum: number;
		maximum: number;
		minVotes: number;
		maxVotes: number;
	};
	publicKey: string;
	rank: number;
	slug: string;
	voterCount: number;
	votes: number;
	website?: string;
}

export { DelegateData };
