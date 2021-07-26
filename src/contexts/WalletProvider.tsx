import React from "react";

interface WalletProviderProps {
	api: any;
	children: React.ReactNode;
}

const WalletContext = React.createContext();

export const WalletProvider = ({ api, children }: WalletProviderProps) => (
	<WalletContext.Provider value={api}>{children}</WalletContext.Provider>
);

export const useWalletContext = () => React.useContext(WalletContext);
