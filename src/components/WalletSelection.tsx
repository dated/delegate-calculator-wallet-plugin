import React from "react";

import { Avatar } from "./Avatar";

const { Components } = globalThis.payvo;
const { Modal } = Components;

interface WalletSelectionProps {
	isOpen: boolean;
	wallets: any[];
	onSelectWallet: (address: string) => void;
	onClose: () => void;
}

interface WalletSelectionItemProps {
	wallet: any;
	onSelect: (address: string) => void;
}

const WalletSelectionItem = ({ wallet, onSelect }: WalletSelectionItemProps) => {
	const address = wallet.data.ADDRESS;
	const { ALIAS: alias, AVATAR: avatar } = wallet.settings;

	return (
		<div
			className="flex items-center cursor-pointer border-b border-dashed border-theme-secondary-300 dark:border-theme-secondary-800 space-x-4 py-4 last:border-0"
			onClick={() => onSelect(address)}
		>
			<Avatar imageData={avatar} />

			<div className="flex flex-col flex-1 overflow-hidden whitespace-nowrap no-ligatures">
				<span className="font-semibold text-theme-secondary-text text-sm">{alias}</span>
				<span className="truncate text-theme-secondary-500 dark:text-theme-secondary-700 font-semibold">
					{address}
				</span>
			</div>
		</div>
	);
};

export const WalletSelection = ({ isOpen, wallets, onSelectWallet, onClose }: WalletSelectionProps) => (
	<Modal isOpen={isOpen} title="Select Wallet" onClose={onClose}>
		{wallets.map((wallet) => (
			<WalletSelectionItem key={wallet.data.ADDRESS} wallet={wallet} onSelect={onSelectWallet} />
		))}
	</Modal>
);
