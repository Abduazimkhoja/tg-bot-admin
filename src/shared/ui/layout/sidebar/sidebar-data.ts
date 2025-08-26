import {
	FlaskConical,
	GalleryHorizontal,
	Home,
	LayoutDashboard,
	type LucideProps,
} from "lucide-react";
import type { FC } from "react";
import { ROUTES_LIST } from "@/constants/routes-list.const";

export const getSidebarData = ({ hideList = [] }: Params = {}): SidebarData => {
	return [
		{
			value: "home",
			hide: hideList.includes("home"),
			label: "Главная",
			link: ROUTES_LIST.home,
			icon: Home,
		},
		{
			value: "demo",
			hide: hideList.includes("demo"),
			label: "Демо",
			link: ROUTES_LIST.demo,
			icon: FlaskConical,
		},
		// {
		// 	value: "dashboard",
		// 	hide: hideList.includes("dashboard"),
		// 	label: "Dashboard",
		// 	link: "/dashboard",
		// 	icon: LayoutDashboard,
		// },
		{
			value: "banners",
			hide: hideList.includes("banners"),
			label: "Баннеры",
			link: ROUTES_LIST.banners,
			icon: GalleryHorizontal,
		},
	];
};

interface Params {
	hideList?: SidebarValue[];
}

export type SidebarData = {
	value: SidebarValue;
	label: string;
	link?: string;
	icon: FC<LucideProps>;
	hide?: boolean;
	children?: SidebarData;
}[];

export const SidebarValue = {
	home: "home",
	demo: "demo",
	dashboard: "dashboard",
	banners: "banners",
} as const;

export type SidebarValue = keyof typeof SidebarValue;
