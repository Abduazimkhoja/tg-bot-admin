import { cn } from "@/shared/lib/cn";
import type { ReactNode } from "react";

export const Container = ({ children }: Props) => {
	return <div className={cn("")}>{children}</div>;
};

interface Props {
	children: ReactNode;
}
