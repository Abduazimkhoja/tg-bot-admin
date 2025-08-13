import type { Metadata, NextPage, ResolvingMetadata } from "next";
import type { DefaultParams } from "./next";

export type ErrorRouteProps = NextPage<{
	error: Error;
	reset: () => void;
}>;

export type DynamicMetadata<
	Params extends DefaultParams = DefaultParams,
	SearchParams extends object = object,
> = (
	params: {
		params: Promise<Params>;
		searchParams: Promise<SearchParams>;
	},
	parent: ResolvingMetadata,
) => Promise<Metadata> | Metadata;
