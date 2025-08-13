import type { ReactNode } from "react";

export const List = ({ children }: Props) => {
	return <div>{children}</div>;
};

interface Props {
	children: ReactNode;
}
