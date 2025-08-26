import { createUrl } from "@/shared/lib/formatters/url-formatter/createUrl";

export const ENV = {
	backendUrl: createUrl({
		baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "",
		basePaths: ["api"],
	}),
	imageUrl: createUrl({
		baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "",
		// basePaths: [""],
	}),
};

export const isDevelopment = process.env.NODE_ENV === "development";
