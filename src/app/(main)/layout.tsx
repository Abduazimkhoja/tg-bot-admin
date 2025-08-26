import type { LayoutProps } from "@/shared/types/next";
import { Sidebar } from "@/shared/ui";

const Layout = async ({ params, children }: LayoutProps) => {
	return (
		<>
			<Sidebar />
			<div className="px-7 py-8 w-full overflow-x-auto">{children}</div>
		</>
	);
};

export default Layout;
