import React from "react";

import { DelegateData } from "../../models";

interface DelegateDetailsListProps {
	title?: string;
	items: DelegateDetailsListItemProps[];
}

interface DelegateDetailsListItemProps {
	key: string;
	label: string;
	value: string | React.ReactNode;
}

const DelegateDetailsListItem = ({ label, value }: DelegateDetailsListItemProps) => (
	<div className="border-b border-dashed border-theme-secondary-300 dark:border-theme-secondary-800 space-x-4 py-4 last:border-0">
		<div className="flex justify-between">
			<span className="font-semibold text-theme-secondary-700 dark:text-theme-secondary-200">{label}</span>
			<span className="font-semibold text-theme-secondary-500 dark:text-theme-secondary-700">{value}</span>
		</div>
	</div>
);

const DelegateDetailsList = ({ title, items }: DelegateDetailsListProps) => (
	<div>
		{title && <h3 className="mt-4 mb-0">{title}</h3>}
		{items.map((item: DelegateDetailsListItem, index: number) => (
			<DelegateDetailsListItem key={index} {...item} />
		))}
	</div>
);

const TypeBadge = ({ isPrivate }: { isPrivate: boolean }) => {
	if (isPrivate) {
		return (
			<span className="ml-2 bg-theme-danger-400 text-white text-xs text-center font-semibold rounded py-1 px-2">
				Private
			</span>
		);
	}

	return (
		<span className="ml-2 bg-theme-success-600 text-white text-xs text-center font-semibold rounded py-1 px-2">
			Public
		</span>
	);
};

const ClaimStatusBadge = ({ isClaimed }: { isClaimed: boolean }) => {
	if (isClaimed) {
		return <></>;
	}

	return (
		<span className="ml-2 bg-theme-danger-400 text-white text-xs text-center font-semibold rounded py-1 px-2">
			Unclaimed
		</span>
	);
};

const DelegateDetailsTitle = ({ delegate }: DelegateData) => (
	<div className="flex items-center">
		<span>{delegate.name}</span>
		<TypeBadge isPrivate={delegate.isPrivate} />
		<ClaimStatusBadge isClaimed={delegate.isClaimed} />
	</div>
);

export { DelegateDetailsList, DelegateDetailsTitle };
