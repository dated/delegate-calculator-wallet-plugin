import { useCallback, useEffect, useState } from "react";

import { useWalletContext } from "../contexts/WalletProvider";
import { DelegateData } from "../models";

export const useDelegateData = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [delegateData, setDelegateData] = useState([]);

	const context = useWalletContext();
	const client = context.http().create();

	useEffect(() => {
		const fetchDelegateData = async () => {
			setIsLoading(true);

			let delegates: DelegateData[] = [];

			try {
				const response = await client.get("https://arkdelegates.live/api/delegates", { limit: 51 });

				delegates = response.json().data.map((delegate: any) => ({
					contributions: {
						count: delegate.contributionsCount,
						last: delegate.days_since_last_contribution,
						status: delegate.contribution_status,
					},
					isClaimed: delegate.is_claimed,
					isPrivate: delegate.is_private,
					name: delegate.name,
					payout: {
						interval: delegate.payout_interval,
						maxVotes:
							delegate.payout_maximum_vote_amount && delegate.payout_maximum_vote_amount !== "0"
								? Number(delegate.payout_maximum_vote_amount)
								: null,
						maximum:
							delegate.payout_maximum && delegate.payout_maximum !== "0"
								? Number(delegate.payout_maximum)
								: null,
						minVotes:
							delegate.payout_minimum_vote_amount && delegate.payout_minimum_vote_amount !== "0"
								? Number(delegate.payout_minimum_vote_amount)
								: null,
						minimum:
							delegate.payout_minimum && delegate.payout_minimum !== "0"
								? Number(delegate.payout_minimum)
								: null,
						percentage: delegate.payout_percent,
					},
					publicKey: delegate.public_key,
					rank: delegate.rank,
					slug: delegate.slug,
					voterCount: delegate.delegateStatistics.payload.voters_not_zero_balance,
					votes: Number(delegate.delegateStatistics.voting_power),
					website: delegate.website,
				}));
			} catch {
				//
			}

			setIsLoading(false);

			setDelegateData(delegates);
		};

		fetchDelegateData();
	}, []);

	const calculateRewards = useCallback(
		(selectedWallet) => {
			let mapped = delegateData.map((delegate) => {
				const newDelegate = {
					...delegate,
					isVoted: false,
				};

				const balance = Number(selectedWallet.data.BALANCE.available);

				if (selectedWallet.data.VOTES.length > 0 && newDelegate.publicKey === selectedWallet.data.VOTES[0].id) {
					newDelegate.isVoted = true;
				}

				if (!newDelegate.isVoted) {
					newDelegate.votes = newDelegate.votes + balance;
				}

				newDelegate.rewards = ((balance / newDelegate.votes) * 422 * newDelegate.payout.percentage) / 100;

				return newDelegate;
			});

			const votedDelegate = mapped.find((delegate) => delegate.isVoted);

			if (votedDelegate) {
				mapped = mapped.map((delegate) => {
					delegate.rewardsDiff =
						delegate.publicKey === selectedWallet.data.VOTES[0].id
							? undefined
							: delegate.rewards - votedDelegate.rewards;
					return delegate;
				});
			}

			return mapped;
		},
		[delegateData],
	);

	return { calculateRewards, isLoading };
};
