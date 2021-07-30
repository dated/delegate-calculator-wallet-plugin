import { DelegateData } from "../models";
interface DelegateTableProps {
    isLoading: boolean;
    delegateData: DelegateData[];
    onSelectDelegate: (delegate: DelegateData) => void;
}
declare const DelegateTable: ({ isLoading, delegateData, onSelectDelegate }: DelegateTableProps) => any;
export { DelegateTable };
