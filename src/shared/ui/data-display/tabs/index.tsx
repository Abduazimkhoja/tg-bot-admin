import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { TabsContent, TabsList, TabsManual, TabsTrigger } from "./manual";

export const Tabs = <T extends string>({
	className,
	defaultValue,
	items,
}: Props<T>) => {
	return (
		<TabsManual
			defaultValue={defaultValue}
			className={cn("w-[400px]", className)}
		>
			<TabsList>
				{items.map(({ label, value, disabled }) => (
					<TabsTrigger key={value} value={value} disabled={disabled}>
						{label}
					</TabsTrigger>
				))}
			</TabsList>

			{items.map(({ value, children }) => (
				<TabsContent key={value} value={value}>
					{children}
				</TabsContent>
			))}
		</TabsManual>
	);
};

interface Props<T extends string> {
	className?: string;
	defaultValue?: T;
	items: {
		value: T;
		label: ReactNode;
		children: ReactNode;
		disabled?: boolean;
	}[];
}
