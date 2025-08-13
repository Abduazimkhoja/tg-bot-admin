import { createParser, createSearchParamsCache } from "nuqs/server";
import { PAGINATION_PER_PAGE } from "@/constants/pagination.const";
import { pageParser } from "./nuqs-custom-parsers/page-parser";
import { perPageParser } from "./nuqs-custom-parsers/per-page-parser";

export const parseAsPage = createParser({
	parse: pageParser,
	serialize(value) {
		return String(value);
	},
});

export const parseAsPerPage = createParser({
	parse: perPageParser,
	serialize(value) {
		return String(value);
	},
});

export const searchParamsParsers = {
	currentPage: parseAsPage.withDefault(1).withOptions({
		shallow: false,
		history: "push",
		clearOnDefault: true,
		scroll: true,
	}),
	perPage: parseAsPerPage.withDefault(PAGINATION_PER_PAGE).withOptions({
		shallow: false,
		history: "push",
		clearOnDefault: true,
		scroll: true,
	}),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
