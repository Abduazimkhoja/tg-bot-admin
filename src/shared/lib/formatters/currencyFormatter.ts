export type FormatCurrencyConfigs = {
	locale?: Locale;
	maximumFractionDigits?: number;
} & (
	| {
			style?: "currency";
			currency?: Currencies | (string & {});
			format?: "code" | "name" | "symbol";
	  }
	| {
			style?: "decimal";
			currency?: never;
			format?: never;
	  }
);

type FormatCurrency = (
	price: number,
	configs?: FormatCurrencyConfigs,
) => string;

const initialCurrencyConfig: FormatCurrencyConfigs = {
	style: "currency",
	currency: "USD",
	format: "code",

	locale: "ru-RU",
	maximumFractionDigits: 0,
};

export const formatCurrency: FormatCurrency = (
	value,
	{ locale: newLocale, ...configs } = {},
) => {
	const { locale: initialLocale, ...initialConfigs } = initialCurrencyConfig;
	const currencyFormat = { ...initialConfigs, ...configs };
	const currencyLocale = newLocale || initialLocale;

	const formatter = new Intl.NumberFormat(currencyLocale, currencyFormat);

	return formatter.format(value);
};

// import { Currencies } from '@/types/currency.type';
// import { Locale } from '@/types/locales.type';

// type Configs = {
//   currency?: Currencies | (string & {});
//   format?: 'code' | 'name' | 'symbol';
//   locale?: Locale;
// };

// type FormatCurrency = (price: number, configs?: Configs) => string;

// const initalCurrencyConfig: Configs & { style: 'currency' } = {
//   style: 'currency' as const,
//   currency: 'USD',
//   format: 'symbol',
//   locale: 'en-US',
// };

// export const formatCurrency: FormatCurrency = (value, { locale: newLocale, ...configs } = {}) => {
//   const { locale: initialLocale, ...initialConfigs } = initalCurrencyConfig;
//   const currencyFormat = { ...initialConfigs, ...configs };
//   const currencyLocale = newLocale || initialLocale;

//   const formatter = new Intl.NumberFormat(currencyLocale, currencyFormat);

//   return formatter.format(value);
// };

// EXAMPLE 📝
// const formattedCurrency = formatCurrency(20000, {
//   currency: 'USD',
//   format: 'code',
//   locale: 'en-US',
// });
// console.log(formattedCurrency) // $ 20 000

type Locale =
	| "en-US"
	| "ru-RU"
	| "fr-FR"
	| "de-DE"
	| "es-ES"
	| "it-IT"
	| "ja-JP"
	| "zh-CN"
	| "ko-KR"
	| "pt-BR"
	| "ar-SA"
	| "nl-NL"
	| "sv-SE"
	| "pl-PL"
	| "cs-CZ"
	| "da-DK"
	| "fi-FI"
	| "nb-NO"
	| "tr-TR"
	| "uk-UA"
	| "vi-VN"
	| "th-TH"
	| "he-IL"
	| "hu-HU"
	| "ro-RO"
	| "bg-BG"
	| "sk-SK"
	| "hr-HR"
	| "lt-LT"
	| "lv-LV"
	| "et-EE";

export type Currencies =
	| "RUB" // Российский рубль
	| "USD" // Доллар США
	| "EUR" // Евро
	| "GBP" // Британский фунт стерлингов
	| "CNY" // Китайский юань
	| "JPY" // Японская иена
	| "AUD" // Австралийский доллар
	| "CAD" // Канадский доллар
	| "CHF" // Швейцарский франк
	| "SEK" // Шведская крона
	| "NZD"; // Новозеландский доллар
