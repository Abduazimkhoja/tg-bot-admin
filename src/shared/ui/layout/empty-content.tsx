import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const EmptyContent = ({ className, message = "Нет данных" }: Props) => {
	return (
		<div
			className={cn(
				"flex-center flex-col text-3xl text-gray-300 font-bold h-full",
				className,
			)}
		>
			<Inbox className="size-20" />
			{message}
		</div>
	);
};

interface Props {
	className?: string;
	message?: ReactNode;
}
