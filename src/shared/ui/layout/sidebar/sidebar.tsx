import { SignOutButton } from "../sign-out-button";
import { getSidebarData } from "./sidebar-data";
import { SidebarItems } from "./sidebar-items";

export const Sidebar = () => {
	const sidebarData = getSidebarData({ hideList: [] });

	return (
		<aside className="sticky top-0 h-screen min-w-72 bg-gray-200 flex flex-col justify-between">
			<ul className="flex flex-col gap-1 overflow-y-auto p-5">
				<SidebarItems items={sidebarData} />
			</ul>
			<SignOutButton className="mb-5 mx-5">Выйти</SignOutButton>
		</aside>
	);
};
