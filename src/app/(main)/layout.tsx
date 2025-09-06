import type { LayoutProps } from "@/shared/types/next";
import { Sidebar } from "@/shared/ui";

const Layout = async ({ children }: LayoutProps) => {
	return (
		<>
			<Sidebar />
			<div className="w-full overflow-x-hidden">{children}</div>
		</>
	);
};

export default Layout;
