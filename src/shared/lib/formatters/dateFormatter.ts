const initialDateConfigs: FormatTimestampConfigs = {
	year: "numeric",
	day: "2-digit",
	month: "long",
	hour: "2-digit",
	minute: "2-digit",
	// second: "2-digit",
	hour12: false, // 24-hour format
};

export const formatDate: FormatTimestamp = (
	date,
	{ locale, ...configs } = {},
) => {
	const newDate = new Date(Number.isFinite(+date) ? Number(date) : date);
	const { locale: initialLocale, ...initialConfigs } = initialDateConfigs;

	const dateConfigs = { ...initialConfigs, ...configs };
	const dateLocale = locale || initialLocale;

	const formattedDate = newDate.toLocaleDateString(dateLocale, dateConfigs);

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
	date: string | Date,
	configs?: FormatTimestampConfigs,
) => string;
