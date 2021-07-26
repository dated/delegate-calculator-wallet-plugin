import React from "react";

import { DelegateData } from "../models";
import { formatCrypto, upperFirst } from "../utils";

const { Components } = globalThis.payvo;
const { Spinner, Table, TableCell, TableRow, Tooltip } = Components;

interface DelegateTableProps {
	isLoading: boolean;
	delegateData: DelegateData[];
	onSelectDelegate: (delegate: DelegateData) => void;
}

interface DelegateListItemProps {
	delegate: DelegateData;
	onSelect: (delegate: DelegateData) => void;
}

const DelegateListItem = ({ delegate, onSelect }: DelegateListItemProps) => {
	const renderStatus = () => {
		const { isClaimed, isPrivate } = delegate;

		if (isClaimed) {
			return (
				<Tooltip
					content={isPrivate ? "You may not receive any rewards from this delegate" : undefined}
					placement="right"
					size="sm"
				>
					<span>{isPrivate ? "Private" : "Public"}</span>
				</Tooltip>
			);
		}

		return (
			<Tooltip
				content="The delegate has not claimed their account and the information shown is likely to be inaccurate"
				placement="right"
				size="sm"
			>
				<span>Unclaimed</span>
			</Tooltip>
		);
	};

	const renderContributionStatus = () => {
		const { count, last, status } = delegate.contributions;

		const tooltipContent = () => {
			if (last === 0) {
				return "The last contribution was published today";
			}

			if (last === 1) {
				return `The last contribution was published ${last} day ago`;
			}

			return `The last contribution was published ${last} days ago`;
		};

		if (count && status !== "inactive") {
			return (
				<span className="ml-2 pl-2 border-l border-theme-secondary-300 dark:border-theme-secondary-800">
					<Tooltip content={tooltipContent()} placement="right" size="sm">
						<span>{`${upperFirst(status)} Contributor`}</span>
					</Tooltip>
				</span>
			);
		}

		return <></>;
	};

	return (
		<TableRow>
			<TableCell variant="start">
				<div className="flex flex-col">
					<div className="flex items-center">
						<span
							className="font-semibold text-theme-primary-600 hover:text-theme-primary-700 cursor-pointer"
							onClick={() => onSelect(delegate)}
						>
							{delegate.name}
						</span>
						{delegate.isVoted && (
							<span className="ml-2 bg-theme-danger-400 text-white text-xs text-center font-semibold rounded py-1 px-2">
								Voted
							</span>
						)}
					</div>

					<div className="flex font-semibold text-xs text-theme-secondary-text">
						{renderStatus()} {renderContributionStatus()}
					</div>
				</div>
			</TableCell>

			<TableCell innerClassName="justify-end">
				<div className="flex flex-col items-end">
					<span>
						{delegate.rewards ? formatCrypto({ showTicker: false, value: delegate.rewards }) : "None"}
					</span>
					{delegate.rewardsDiff !== undefined && (
						<span
							className={`font-semibold text-xs ${
								delegate.rewardsDiff > 0 ? "text-theme-success-600" : "text-theme-danger-400"
							}`}
						>
							{delegate.rewardsDiff > 0 && <span>+</span>}
							{formatCrypto({ showTicker: false, value: delegate.rewardsDiff })}
						</span>
					)}
				</div>
			</TableCell>

			<TableCell innerClassName="justify-end">
				<div className="flex flex-col items-end">
					<span>
						{delegate.rewards ? formatCrypto({ showTicker: false, value: delegate.rewards * 7 }) : "None"}
					</span>
					{delegate.rewardsDiff !== undefined && (
						<span
							className={`font-semibold text-xs ${
								delegate.rewardsDiff > 0 ? "text-theme-success-600" : "text-theme-danger-400"
							}`}
						>
							{delegate.rewardsDiff > 0 && <span>+</span>}
							{formatCrypto({ showTicker: false, value: delegate.rewardsDiff * 7 })}
						</span>
					)}
				</div>
			</TableCell>

			<TableCell innerClassName="justify-end">
				<span>{delegate.payout.percentage}%</span>
			</TableCell>

			<TableCell variant="end" innerClassName="justify-end">
				<span>{delegate.payout.interval}h</span>
			</TableCell>
		</TableRow>
	);
};

const DelegateTable = ({ isLoading, delegateData = [], onSelectDelegate }: DelegateTableProps) => {
	const columns = [
		{
			Header: "Name",
			accessor: "name",
		},
		{
			Header: "Daily Rewards",
			accessor: "rewards",
			className: "justify-end",
		},
		{
			Header: "Weekly Rewards",
			accessor: (delegate) => delegate.rewards,
			className: "justify-end",
		},
		{
			Header: "Payout",
			accessor: (delegate) => delegate.payout.percentage,
			className: "justify-end",
		},
		{
			Header: "Interval",
			accessor: (delegate) => delegate.payout.interval,
			className: "justify-end",
		},
	];

	if (isLoading) {
		return (
			<div className="flex flex-1 justify-center items-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="mt-8">
			<Table columns={columns} data={delegateData}>
				{(delegate: DelegateData) => <DelegateListItem delegate={delegate} onSelect={onSelectDelegate} />}
			</Table>
		</div>
	);
};

export { DelegateTable };
