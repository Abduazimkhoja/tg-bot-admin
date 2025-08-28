import type { Id } from "@/shared/types/shared.type";

export const ROUTES_LIST = {
	home: "/",
	demo: "/demo",
	banners: "/banners",
	banner: (id: Id) => `/banner/${id}`,
	categories: "/categories",
	category: (id: Id) => `/category/${id}`,
	products: "/products",
	product: (id: Id | "create") => `/products/${id}`,
} as const;
