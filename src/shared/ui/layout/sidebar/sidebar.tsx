import { SignOutButton } from "../sign-out-button";
import { getSidebarData, SidebarValue } from "./sidebar-data";
import { SidebarList } from "./sidebar-list";

export const Sidebar = () => {
	const hideList: SidebarValue[] = [];

	if (process.env.NODE_ENV !== "development") {
		hideList.push(SidebarValue.demo);
	}

	const sidebarData = getSidebarData({
		hideList,
	});

	return (
		<aside className="sticky top-0 h-screen min-w-72 bg-gray-200 flex flex-col justify-between">
			<ul className="flex flex-col gap-1 overflow-y-auto p-5">
				<SidebarList items={sidebarData} />
			</ul>
			<SignOutButton className="mb-5 mx-5">Выйти</SignOutButton>
		</aside>
	);
};
