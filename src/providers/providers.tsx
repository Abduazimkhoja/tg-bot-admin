import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { ReactNode } from "react";
import { RQProvider } from "./rq-provider";

export const Providers = ({ children }: Props) => {
	return (
		<RQProvider>
			<SessionProvider>
				<NuqsAdapter>{children}</NuqsAdapter>
			</SessionProvider>
		</RQProvider>
	);
};

interface Props {
	children: ReactNode;
}
