import React, { useEffect, useLayoutEffect, useState } from "react";

import { DelegateDetails } from "../components/DelegateDetails";
import { DelegateTable } from "../components/DelegateTable";
import { Header } from "../components/Header";
import { WalletSelection } from "../components/WalletSelection";
import { useWalletContext } from "../contexts/WalletProvider";
import { useDelegateData } from "../hooks/use-delegate-data";
import { DelegateData } from "../models";
import { WelcomePage } from "./Welcome";

export const MainPage = () => {
	const context = useWalletContext();

	const [isWalletSelectionOpen, setIsWalletSelectionOpen] = useState(false);
	const [isDelegateDetailsOpen, setIsDelegateDetailsOpen] = useState(false);
	const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

	const [mappedDelegates, setMappedDelegates] = useState([]);

	const [wallets] = useState(() =>
		(context.profile().wallets() || []).filter(
			(wallet: any) => wallet.data.COIN === "ARK" && wallet.data.NETWORK === "ark.mainnet",
		),
	);

	const [selectedDelegate, setSelectedDelegate] = useState<any | undefined>();
	const [selectedWallet, setSelectedWallet] = useState(() => {
		if (wallets.length) {
			return wallets[0];
		}
	});

	const { isLoading, calculateRewards } = useDelegateData();

	useLayoutEffect(() => {
		if (context.store().data().get("hasAcceptedDisclaimer")) {
			setHasAcceptedDisclaimer(true);
		}
	}, []);

	const handleClickAddress = () => {
		setIsWalletSelectionOpen(true);
	};

	const handleSelectWallet = (address: string) => {
		const wallet = context
			.profile()
			.wallets()
			.find((wallet) => wallet.data.ADDRESS === address);

		setSelectedWallet(wallet);
		setIsWalletSelectionOpen(false);
	};

	const handleSelectDelegate = (delegate: DelegateData) => {
		setSelectedDelegate(delegate);
		setIsDelegateDetailsOpen(true);
	};

	const handleAcceptDisclaimer = () => {
		context.store().data().set("hasAcceptedDisclaimer", true);
		context.store().persist();

		setHasAcceptedDisclaimer(true);
	};

	useEffect(() => {
		if (selectedWallet) {
			setMappedDelegates(calculateRewards(selectedWallet));
		}
	}, [calculateRewards, selectedWallet]);

	const hasWallets = wallets.length > 0;

	if (!hasAcceptedDisclaimer || !hasWallets) {
		return (
			<WelcomePage hasAcceptedDisclaimer={hasAcceptedDisclaimer} onAcceptDisclaimer={handleAcceptDisclaimer} />
		);
	}

	return (
		<>
			<div className="flex items-center w-full border-t border-theme-secondary-300 dark:border-theme-secondary-800">
				<div className="flex flex-col mx-auto container p-10 h-full">
					<Header selectedWallet={selectedWallet} onClickAddress={handleClickAddress} />

					<DelegateTable
						isLoading={isLoading}
						delegateData={mappedDelegates}
						onSelectDelegate={handleSelectDelegate}
					/>
				</div>
			</div>

			<WalletSelection
				isOpen={isWalletSelectionOpen}
				wallets={wallets}
				onSelectWallet={handleSelectWallet}
				onClose={() => setIsWalletSelectionOpen(false)}
			/>

			<DelegateDetails
				isOpen={isDelegateDetailsOpen}
				delegate={selectedDelegate}
				onClose={() => {
					setIsDelegateDetailsOpen(false);
					setSelectedDelegate(undefined);
				}}
			/>
		</>
	);
};
