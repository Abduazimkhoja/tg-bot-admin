import { NuqsAdapter } from "nuqs/adapters/next";
import type { ReactNode } from "react";

export const Providers = ({ children }: Props) => {
	return <NuqsAdapter>{children}</NuqsAdapter>;
};

interface Props {
	children: ReactNode;
}
