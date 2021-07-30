import { DelegateData } from "../models";
interface DelegateDetailsProps {
    isOpen: boolean;
    delegate: DelegateData;
    onClose: () => void;
}
declare const DelegateDetails: ({ isOpen, delegate, onClose }: DelegateDetailsProps) => any;
export { DelegateDetails };
