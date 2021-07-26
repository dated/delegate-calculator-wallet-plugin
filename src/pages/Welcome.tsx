import React from "react";

const { Components } = globalThis.payvo;
const { Box } = Components;

interface WelcomePageProps {
	hasAcceptedDisclaimer: boolean;
	onAcceptDisclaimer: () => void;
}

const WelcomePage = ({ hasAcceptedDisclaimer, onAcceptDisclaimer }: WelcomePageProps) => {
	const handleImportWallet = () => {
		// TOOD
		console.log("import wallet");
	};

	const renderContent = () => {
		if (!hasAcceptedDisclaimer) {
			return (
				<>
					<span className="my-10">
						The information presented by this plugin is based on the data available on{" "}
						<span className="font-semibold">arkdelegates.live</span> and has been prepared for informational
						purposes only.
					</span>

					<button
						type="button"
						className="mr-auto rounded transition-all duration-100 ease-linear font-semibold bg-white hover:bg-theme-danger-100 text-theme-danger-400 px-5 py-3 disabled:cursor-not-allowed"
						onClick={onAcceptDisclaimer}
					>
						<span>I Understand</span>
					</button>
				</>
			);
		}

		return (
			<>
				<span className="my-10">
					This plugin needs at least one ARK wallet on your profile in order to work, but you have none at the
					moment.
				</span>

				<button
					type="button"
					className="mr-auto rounded transition-all duration-100 ease-linear font-semibold bg-white hover:bg-theme-danger-100 text-theme-danger-400 px-5 py-3 disabled:cursor-not-allowed"
					onClick={handleImportWallet}
					disabled
				>
					<span>Import a Wallet</span>
				</button>
			</>
		);
	};

	return (
		<Box
			as="div"
			styled={{ backgroundColor: "#C9292C" }}
			className="flex items-center w-full border-t border-theme-secondary-300 dark:border-theme-secondary-800"
		>
			<div className="flex mx-auto container p-10 justify-end items-center text-white">
				<div className="flex flex-col w-1/2">
					<h1>ARK Delegate Calculator</h1>

					{renderContent()}

					<span className="mt-20 text-xs">© {new Date().getFullYear()} dated / v1.1.0</span>
				</div>
			</div>
		</Box>
	);
};

export { WelcomePage };
