import en_flag from "public/flags/en-flag.svg";
import ru_flag from "public/flags/ru-flag.svg";
import uz_flag from "public/flags/uz-flag.svg";
import type { ComponentProps, ReactNode } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { findKey } from "@/shared/lib/find-key";
import { type LocaleCode, localeList } from "@/shared/types/locale.type";
import { FormField, Input, NextImage } from "@/shared/ui";

const flagIcons = {
	en: en_flag,
	ru: ru_flag,
	uz: uz_flag,
};

export const MultiLangInput = ({
	error,
	formFieldProps,
	required,
	name,
	register,
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
					className={cn("", formFieldProps?.className)}
					label={
						label ? (
							<span className="flex items-center gap-1 mb-1">
								<NextImage
									src={flagIcons[locale]}
									alt={locale}
									width={20}
									height={20}
								/>
								<span>{label}</span>
							</span>
						) : undefined
					}
					error={findKey(error?.[locale], "message")}
				>
					<Input
						{...register?.(`${name}.${locale}`)}
						{...restProps}
						className={cn("w-full", className)}
						key={locale}
						name={`${name}.${locale}`}
						// required={required}
					/>
				</FormField>
			))}
		</>
	);
};

interface Props extends ComponentProps<typeof Input> {
	label?: ReactNode;
	error?: FieldErrors<Record<LocaleCode, string>>;
	formFieldProps?: ComponentProps<typeof FormField>;
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: no lint
	register?: UseFormRegister<any>;
}
