type Configs = {
	format?: "short" | "long" | "narrow";
	locale?: Locale;
};

type FormatUnit = (value: number, unit: Unit, configs?: Configs) => string;

const initialUnitConfigs: Configs & { style: "unit" } = {
	style: "unit" as const,
	format: "short",
	locale: "ru-RU",
};

export const formatUnit: FormatUnit = (
	value,
	unit,
	{ locale: newLocale, ...configs } = {},
) => {
	const { locale: initialLocale, ...initialConfigs } = initialUnitConfigs;
	const unitConfigs = { ...initialConfigs, ...configs, unit };
	const unitLocale = newLocale || initialLocale;

	const formatter = new Intl.NumberFormat(unitLocale, unitConfigs);

	return formatter.format(value);
};

// EXAMPLE 📝
// const formattedUnit = formatUnit(20000, 'byte', {
//   format: 'long',
//   locale: 'en-US',
// });
// console.log(formattedUnit); // 20,000 byte

type Unit =
	| "acre"
	| "bit"
	| "byte"
	| "celsius"
	| "centimeter"
	| "day"
	| "degree"
	| "fahrenheit"
	| "fluid-ounce"
	| "foot"
	| "gallon"
	| "gigabit"
	| "gigabyte"
	| "gram"
	| "hectare"
	| "hour"
	| "inch"
	| "kilobit"
	| "kilobyte"
	| "kilogram"
	| "kilometer"
	| "liter"
	| "megabit"
	| "megabyte"
	| "meter"
	| "mile"
	| "milliliter"
	| "millimeter"
	| "millisecond"
	| "minute"
	| "month"
	| "ounce"
	| "percent"
	| "petabyte"
	| "pound"
	| "second"
	| "stone"
	| "terabit"
	| "terabyte"
	| "week"
	| "yard"
	| "year";

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
