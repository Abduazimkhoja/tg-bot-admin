import { cn } from "@/shared/lib/cn";

export const Skeleton = ({ className }: Props) => {
	return (
		<div
			className={cn("animate-pulse bg-slate-300 rounded-xl w-full", className)}
		/>
	);
};

interface Props {
	className?: string;
}
