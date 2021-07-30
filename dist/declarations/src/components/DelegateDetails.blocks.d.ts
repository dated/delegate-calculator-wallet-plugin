import React from "react";
interface DelegateDetailsListProps {
    title?: string;
    items: DelegateDetailsListItemProps[];
}
interface DelegateDetailsListItemProps {
    key: string;
    label: string;
    value: string | React.ReactNode;
}
declare const DelegateDetailsList: ({ title, items }: DelegateDetailsListProps) => any;
declare const DelegateDetailsTitle: ({ delegate }: any) => any;
export { DelegateDetailsList, DelegateDetailsTitle };
