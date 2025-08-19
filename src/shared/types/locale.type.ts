export const localeList = ["ru", "en", "uz"] as const;

export type LocaleCode = (typeof localeList)[number];

export type LocalizedString = Record<LocaleCode, string>;
