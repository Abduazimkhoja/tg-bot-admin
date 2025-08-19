import {
	Bell,
	Bookmark,
	Calendar,
	CreditCard,
	Database,
	FileText,
	HelpCircle,
	Home,
	Layers,
	type LucideProps,
	Mail,
	PieChart,
	Shield,
	ShoppingCart,
	Users,
} from "lucide-react";
import type { FC } from "react";

export const getSidebarData = ({ hideList = [] }: Params = {}): SidebarData => {
	return [
		{
			value: "home",
			hide: hideList.includes("home"),
			label: "Home",
			link: "/",
			icon: Home,
		},
		{
			value: "demo",
			hide: hideList.includes("demo"),
			label: "Demo",
			link: "/demo",
			icon: Home,
		},
		{
			value: "dashboard",
			hide: hideList.includes("dashboard"),
			label: "Dashboard",
			link: "/dashboard",
			icon: Home,
		},
		{
			value: "projects",
			hide: hideList.includes("projects"),
			label: "Projects",
			icon: Layers,
			children: [
				{
					value: "project-list",
					hide: hideList.includes("project-list"),
					label: "Project List",
					link: "/projects/list",
					icon: FileText,
				},
				{
					value: "project-create",
					hide: hideList.includes("project-create"),
					label: "Create Project",
					link: "/projects/create",
					icon: FileText,
				},
			],
		},
		{
			value: "ecommerce",
			hide: hideList.includes("ecommerce"),
			label: "E-Commerce",
			icon: ShoppingCart,
			children: [
				{
					value: "products",
					hide: hideList.includes("products"),
					label: "Products",
					icon: Database,
					children: [
						{
							value: "account",
							hide: hideList.includes("account"),
							label: "Account",
							link: "/settings/account",
							icon: Shield,
						},
						{
							value: "security",
							hide: hideList.includes("security"),
							label: "Security",
							link: "/settings/security",
							icon: Shield,
						},
						{
							value: "preferences",
							hide: hideList.includes("preferences"),
							label: "Preferences",
							link: "/settings/preferences",
							icon: Shield,
						},
					],
				},
				{
					value: "orders",
					hide: hideList.includes("orders"),
					label: "Orders",
					link: "/ecommerce/orders",
					icon: CreditCard,
				},
				{
					value: "customers",
					hide: hideList.includes("customers"),
					label: "Customers",
					link: "/ecommerce/customers",
					icon: Users,
				},
			],
		},
		{
			value: "analytics",
			hide: hideList.includes("analytics"),
			label: "Analytics",
			link: "/analytics",
			icon: PieChart,
		},
		{
			value: "calendar",
			hide: hideList.includes("calendar"),
			label: "Calendar",
			link: "/calendar",
			icon: Calendar,
		},
		{
			value: "messages",
			hide: hideList.includes("messages"),
			label: "Messages",
			link: "/messages",
			icon: Mail,
		},
		{
			value: "notifications",
			hide: hideList.includes("notifications"),
			label: "Notifications",
			link: "/notifications",
			icon: Bell,
		},

		{
			value: "support",
			hide: hideList.includes("support"),
			label: "Support",
			icon: HelpCircle,
			children: [
				{
					value: "documentation",
					hide: hideList.includes("documentation"),
					label: "Documentation",
					link: "/support/docs",
					icon: Bookmark,
				},
				{
					value: "contact",
					hide: hideList.includes("contact"),
					label: "Contact Us",
					link: "/support/contact",
					icon: Mail,
				},
			],
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

type SidebarValue =
	| "home"
	| "demo"
	| "dashboard"
	| "projects"
	| "project-list"
	| "project-create"
	| "ecommerce"
	| "products"
	| "account"
	| "security"
	| "preferences"
	| "orders"
	| "customers"
	| "analytics"
	| "calendar"
	| "messages"
	| "notifications"
	| "support"
	| "documentation"
	| "contact";
