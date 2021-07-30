declare const formatCrypto: ({ locale, value, showTicker, ...parameters }: {
    [x: string]: any;
    locale?: string;
    value: any;
    showTicker?: boolean;
}) => any;
declare const upperFirst: (str: string) => string;
export { formatCrypto, upperFirst };
