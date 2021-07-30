interface WalletSelectionProps {
    isOpen: boolean;
    wallets: any[];
    onSelectWallet: (address: string) => void;
    onClose: () => void;
}
export declare const WalletSelection: ({ isOpen, wallets, onSelectWallet, onClose }: WalletSelectionProps) => any;
export {};
