import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { ReactNode } from "react";

export const Providers = ({ children }: Props) => {
	return (
		<SessionProvider>
			<NuqsAdapter>{children}</NuqsAdapter>
		</SessionProvider>
	);
};

interface Props {
	children: ReactNode;
}
