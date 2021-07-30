import React from "react";

const { Components } = globalThis.payvo;
const { Card } = Components;

import { formatCrypto } from "../utils";
import { Avatar } from "./Avatar";

interface HeaderProps {
	selectedWallet: any; // TODO
	onClickAddress: (address: string) => void;
}

export const Header = ({ selectedWallet, onClickAddress }: HeaderProps) => {
	const balance = selectedWallet.data.BALANCE.available;
	const ticker = selectedWallet.data.COIN;

	return (
		<Card onClick={onClickAddress}>
			<div className="flex">
				<div className="flex items-center w-1/2 space-x-4 pr-6">
					<Avatar imageData={selectedWallet.settings.AVATAR} />

					<div className="flex flex-col flex-1 overflow-hidden">
						<span className="font-semibold text-theme-secondary-text text-sm">Address</span>
						<div className="flex items-center space-x-2 whitespace-nowrap no-ligatures cursor-pointer">
							<span className="font-semibold text-base text-theme-text">{selectedWallet.settings.ALIAS}</span>
							<span className="truncate text-theme-secondary-500 dark:text-theme-secondary-700 font-semibold">
								{selectedWallet.data.ADDRESS}
							</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-1/2 pl-6 border-l border-theme-secondary-300 dark:border-theme-secondary-800">
					<span className="font-semibold text-theme-secondary-text text-sm">Balance</span>
					<span className="font-bold text-theme-text">
						{formatCrypto({ ticker, value: Number(balance / 1e8) })}
					</span>
				</div>
			</div>
		</Card>
	);
};
