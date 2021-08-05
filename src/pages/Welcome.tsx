import React from "react";

import { useWalletContext } from "../contexts/WalletProvider";
import { useImages } from "../hooks/use-image";

const { Components } = globalThis.payvo;
const { Button, Link } = Components;

interface WelcomePageProps {
	hasAcceptedDisclaimer: boolean;
	onAcceptDisclaimer: () => void;
}

const WelcomePage = ({ hasAcceptedDisclaimer, onAcceptDisclaimer }: WelcomePageProps) => {
	const context = useWalletContext();
	const { getImage } = useImages();

	const renderContent = () => {
		if (!hasAcceptedDisclaimer) {
			return (
				<>
					<span className="my-10">
						The information presented by this plugin is based on the data available on{" "}
						<span className="font-semibold">arkdelegates.live</span> and has been prepared for informational
						purposes only.
					</span>

					<Button variant="danger" size="sm" className="mr-auto" onClick={onAcceptDisclaimer}>
						<span>I Understand</span>
					</Button>
				</>
			);
		}

		return (
			<>
				<span className="my-10">
					This plugin needs at least one ARK Wallet on your profile in order to work, but you have none at the
					moment.
				</span>

				<div className="flex items-center h-11">
					<p>
						<Link to={`/profiles/${context.profile().id()}/wallets/import`}>Import</Link> or{" "}
						<Link to={`/profiles/${context.profile().id()}/wallets/create`}>create</Link> a Wallet to get
						started.
					</p>
				</div>
			</>
		);
	};

	return (
		<div className="flex items-center w-full border-t border-theme-secondary-300 dark:border-theme-secondary-800">
			<div className="flex mx-auto container p-10 justify-end items-center">
				<div className="w-1/2">
					<div className="transform -rotate-6 p-16 text-theme-danger-400 dark:text-theme-secondary-800">
						<img src={getImage("calculator")} />
					</div>
				</div>

				<div className="flex flex-col w-1/2">
					<h1>ARK Delegate Calculator</h1>

					{renderContent()}

					<span className="mt-20 font-semibold text-xs">© {new Date().getFullYear()} dated / v1.0.0</span>
				</div>
			</div>
		</div>
	);
};

export { WelcomePage };
