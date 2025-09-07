import type { ReactNode } from "react";

export type DefaultParams = Record<string, string>;
export type SearchQuery = Record<string, string | string[] | undefined>;

declare module "next" {
	export interface PageProps<
		T extends DefaultParams = Record<string, unknown>,
	> {
		params: Promise<T>;
		searchParams: Promise<SearchQuery>;
	}
}

export type LayoutProps<Params extends DefaultParams = DefaultParams> = {
	params: Params;
	children: ReactNode;
};
