"use client";
import { signOut } from "next-auth/react";
import { type ReactNode, useTransition } from "react";
import { Button } from "@/shared/ui";

export const SignOutButton = ({ className, children }: Props) => {
	const [pending, startTransition] = useTransition();

	return (
		<Button
			loading={pending}
			onClick={() => startTransition(async () => await signOut())}
			className={className}
		>
			{children}
		</Button>
	);
};

interface Props {
	className?: string;
	children: ReactNode;
}
