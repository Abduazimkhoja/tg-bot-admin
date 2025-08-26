import { cn } from "@/shared/lib/cn";
import { Skeleton } from "./skeleton";

export const SkeletonsList = ({
	count,
	wrapperClassName,
	className,
}: Props) => {
	return (
		<div className={cn(wrapperClassName)}>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton
					key={index.toString()}
					className={cn("size-full", className)}
				/>
			))}
		</div>
	);
};

interface Props {
	className?: string;
	wrapperClassName?: string;
	count: number;
}
