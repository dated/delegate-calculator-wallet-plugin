import React from "react";
interface WalletProviderProps {
    api: any;
    children: React.ReactNode;
}
export declare const WalletProvider: ({ api, children }: WalletProviderProps) => any;
export declare const useWalletContext: () => any;
export {};
