import React from "react";

import { DelegateData } from "../models";
import { formatCrypto, upperFirst } from "../utils";
import { DelegateDetailsList, DelegateDetailsTitle } from "./DelegateDetails.blocks";

const { Components } = globalThis.payvo;
const { Alert, Link, Modal } = Components;

interface DelegateDetailsProps {
	isOpen: boolean;
	delegate: DelegateData;
	onClose: () => void;
}

const DelegateDetails = ({ isOpen, delegate, onClose }: DelegateDetailsProps) => {
	if (!delegate) {
		return <></>;
	}

	const generalItems = [
		{
			label: "Rank",
			value: delegate.rank,
		},
		{
			label: "Votes",
			value: (
				<span>
					<span className="text-sm">{delegate.voterCount} Voters /</span>{" "}
					{formatCrypto({ value: delegate.votes / 1e8 })}
				</span>
			),
		},
	];

	if (delegate.website) {
		generalItems.push({
			label: "Website",
			value: (
				<Link to={delegate.website} isExternal>
					{delegate.website}
				</Link>
			),
		});
	}

	const payoutItems = [
		{ label: "Shared Percentage", value: `${delegate.payout.percentage}%` },
		{ label: "Interval", value: `${delegate.payout.interval}h` },
	];

	if (delegate.payout.minimum) {
		payoutItems.push({ label: "Minimum Payout", value: formatCrypto({ value: delegate.payout.minimum / 1e8 }) });
	}

	if (delegate.payout.maximum) {
		payoutItems.push({ label: "Maximum Payout", value: formatCrypto({ value: delegate.payout.minimum / 1e8 }) });
	}

	if (delegate.payout.minVotes) {
		payoutItems.push({
			label: "Minimum Required Vote-Weight",
			value: formatCrypto({ value: delegate.payout.minVotes / 1e8 }),
		});
	}

	if (delegate.payout.maxVotes) {
		payoutItems.push({
			label: "Maximum Regarded Vote-Weight",
			value: formatCrypto({ value: delegate.payout.maxVotes / 1e8 }),
		});
	}

	const contributionItems = [
		{ label: "Count", value: delegate.contributions.count },
		{ label: "Days Since Last", value: delegate.contributions.last || "0" },
		{ label: "Status", value: `${upperFirst(delegate.contributions.status)}` },
	];

	return (
		<Modal isOpen={isOpen} title={<DelegateDetailsTitle delegate={delegate} />} onClose={onClose}>
			<DelegateDetailsList items={generalItems} />

			<DelegateDetailsList title="Payout" items={payoutItems} />

			{delegate.contributions.count > 0 && (
				<DelegateDetailsList title="Contributions" items={contributionItems} />
			)}

			<Alert className="mt-4" variant="hint">
				Visit{" "}
				<Link to={`https://arkdelegates.live/delegate/${delegate.slug}`} isExternal>
					arkdelegates.live/delegate/{delegate.slug}
				</Link>{" "}
				for more information about this delegate
			</Alert>
		</Modal>
	);
};

export { DelegateDetails };
