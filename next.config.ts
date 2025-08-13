import BundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME
			? [
					{
						protocol: "https",
						hostname: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
					},
				]
			: [],
	},
	experimental: {
		optimizePackageImports: ["tailwindcss", "dayjs", "tailwind-merge"],
	},
	headers: async () => {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Developed-By",
						value: "Abduazimkhoja",
					},
				],
			},
		];
	},
};

const withBundleAnalyzer = BundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
