import type { Id } from "@/shared/types/shared.type";

export const ROUTES_LIST = {
	home: "/",
	catalogs: "/catalogs",
	catalog: (id: Id) => `/catalogs/${id}`,
	products: "/products",
	product: (id: Id) => `/products/${id}`,
	cart: "/cart",
	favorites: "/favorites",
} as const;
