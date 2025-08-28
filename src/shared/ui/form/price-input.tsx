import { type ChangeEvent, type ComponentProps, useRef } from "react";
import { formatCurrency as formatCurrencyBase } from "@/shared/lib/formatters/currencyFormatter";
import { Input } from "./input";

function parseCurrency(raw: string) {
	const normalized = raw
		.replace(/\s/g, "") // убираем пробелы
		.replace(",", "."); // заменяем запятую на точку

	const num = Number.parseFloat(normalized);
	return Number.isNaN(num) ? null : num;
}

function formatCurrency(value: number) {
	return formatCurrencyBase(value, {
		style: "decimal",
		maximumFractionDigits: 2,
	});
}

export function PriceInput({ onChange, value, ...props }: Props) {
	const formattedValue = useRef<string>(
		value ? formatCurrency(Number(value)) : "",
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const parsed = parseCurrency(e.target.value);

		if (parsed !== null) {
			onChange?.(parsed);
			e.target.value = formatCurrency(parsed);
			formattedValue.current = formatCurrency(parsed);
		} else {
			formattedValue.current = "";
			e.target.value = "";
			onChange?.(0);
		}
	};

	return (
		<Input onChange={handleChange} value={formattedValue.current} {...props} />
	);
}

interface Props
	extends Omit<ComponentProps<typeof Input>, "onChange" | "value"> {
	onChange: (value: number) => void;
	value: string | number;
}
