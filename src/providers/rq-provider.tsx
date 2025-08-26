"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

export const RQProvider = ({ children }: Props) => {
	const [client] = useState(() => new QueryClient());

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

interface Props {
	children: ReactNode;
}
