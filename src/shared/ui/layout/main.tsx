import type { ReactNode } from "react";

export const Main = ({ children }: Props) => {
	return <div>{children}</div>;
};

interface Props {
	children: ReactNode;
}
