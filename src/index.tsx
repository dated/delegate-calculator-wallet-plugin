import React from "react";

import { WalletProvider } from "./contexts/WalletProvider";
import { MainPage } from "./pages/Main";

const entry = (api) => {
	api.launch().render(
		<WalletProvider api={api}>
			<MainPage />
		</WalletProvider>,
	);
};

export default entry;
