const initialDateConfigs: FormatTimestampConfigs = {
	year: "numeric",
	day: "2-digit",
	month: "long",
	hour: "2-digit",
	minute: "2-digit",
	// second: "2-digit",
	hour12: false, // 24-hour format
};

export const formatTimestamp: FormatTimestamp = (
	timestamp,
	{ locale, ...configs } = {},
) => {
	const date = new Date(
		Number.isFinite(+timestamp) ? Number(timestamp) : timestamp,
	);
	const { locale: initialLocale, ...initialConfigs } = initialDateConfigs;

	const dateConfigs = { ...initialConfigs, ...configs };
	const dateLocale = locale || initialLocale;

	const formattedDate = date.toLocaleDateString(dateLocale, dateConfigs);

	return formattedDate;
};

export const toTimestamp = (dateStr: string | null | undefined) => {
	if (!dateStr) return "";
	const date = new Date(dateStr);

	const timestamp = date.getTime();

	return String(timestamp);
};

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

type ConfigList = "year" | "day" | "hour" | "minute" | "second";

type FormatTimestampConfigs = Partial<
	Record<ConfigList, "2-digit" | "numeric">
> & {
	month?: "long" | "short" | "narrow" | "2-digit" | "numeric";
	hour12?: boolean;
	locale?: Locale;
};

type FormatTimestamp = (
	timestamp: string | number,
	configs?: FormatTimestampConfigs,
) => string;
