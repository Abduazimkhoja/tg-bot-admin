import type { LayoutProps } from "@/shared/types/next";
import { Sidebar } from "@/shared/ui";

const Layout = async ({ params, children }: LayoutProps) => {
	return (
		<>
			<Sidebar />
			<div className="w-full">{children}</div>
		</>
	);
};

export default Layout;
