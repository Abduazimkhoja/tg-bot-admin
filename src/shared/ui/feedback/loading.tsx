import { cn } from "@/shared/lib/cn";

export const Loading = ({ className }: Props) => {
	return <span className={cn("loading", className)} />;
};

interface Props {
	className?: string;
}
