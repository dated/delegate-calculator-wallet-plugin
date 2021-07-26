import { Numeral } from "@payvo/intl";

const formatCrypto = ({ locale = "en", value, showTicker = true, ...parameters }) => {
	const ticker = parameters.ticker || "ARK";
	const numeral = Numeral.make(locale, {
		currencyDisplay: "name",
		maximumFractionDigits: 8,
		minimumFractionDigits: 2,
	});

	let formatted = numeral.formatAsCurrency(value, "BTC").replace("BTC", ticker.toUpperCase());

	if (!showTicker) {
		formatted = formatted.split(" ").slice(0, -1).join(" ");
	}

	return formatted;
};

const upperFirst = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export { formatCrypto, upperFirst };
