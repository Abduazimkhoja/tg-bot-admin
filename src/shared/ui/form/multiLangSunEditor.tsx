import en_flag from "public/flags/en-flag.svg";
import ru_flag from "public/flags/ru-flag.svg";
import uz_flag from "public/flags/uz-flag.svg";
import type { ComponentProps, ReactNode } from "react";
import {
	type Control,
	Controller,
	type FieldErrors,
	type FieldValues,
} from "react-hook-form";
import { findKey } from "@/shared/lib/find-key";
import { type LocaleCode, localeList } from "@/shared/types/locale.type";
import { FormField, NextImage, SunEditor } from "@/shared/ui";

const flagIcons = {
	en: en_flag,
	ru: ru_flag,
	uz: uz_flag,
};

export const MultiLangSunEditor = ({
	error,
	formFieldProps,
	required,
	name,
	control,
	className,
	...restProps
}: Props) => {
	const label = restProps.label || formFieldProps?.label;

	return (
		<>
			{localeList.map((locale) => (
				<FormField
					{...formFieldProps}
					key={`${name}.${locale}`}
					required={required}
					label={
						label ? (
							<div className="flex items-center gap-1 mb-1">
								<NextImage
									src={flagIcons[locale]}
									alt={locale}
									width={20}
									height={20}
								/>
								<span>{label}</span>
							</div>
						) : undefined
					}
					error={findKey(error?.[locale], "message")}
				>
					<Controller
						control={control}
						name={`${name}.${locale}`}
						render={({ field }) => (
							<SunEditor
								{...restProps}
								onChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
				</FormField>
			))}
		</>
	);
};

interface Props extends ComponentProps<typeof SunEditor> {
	label?: ReactNode;
	error?: FieldErrors<Record<LocaleCode, string>>;
	required?: boolean;
	name: string;
	formFieldProps?: ComponentProps<typeof FormField>;

	// biome-ignore lint/suspicious/noExplicitAny: ignore this error
	control: Control<any>;
}
