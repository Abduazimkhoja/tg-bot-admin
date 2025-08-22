import BundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const imageHosts = [
	process.env.NEXT_PUBLIC_BACKEND_HOSTNAME
].filter(Boolean) as string[];

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: imageHosts?.map((host) => ({
			protocol: "https",
			hostname: host,
		}))
	},
	experimental: {
		optimizePackageImports: [
			"@dnd-kit/core",
			"@dnd-kit/modifiers",
			"@dnd-kit/sortable",
			"@dnd-kit/utilities",
			"@hookform/resolvers",
			"@pbe/react-yandex-maps",
			"@radix-ui/react-accordion",
			"@radix-ui/react-alert-dialog",
			"@radix-ui/react-avatar",
			"@radix-ui/react-checkbox",
			"@radix-ui/react-collapsible",
			"@radix-ui/react-context-menu",
			"@radix-ui/react-dialog",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-label",
			"@radix-ui/react-popover",
			"@radix-ui/react-progress",
			"@radix-ui/react-radio-group",
			"@radix-ui/react-scroll-area",
			"@radix-ui/react-select",
			"@radix-ui/react-separator",
			"@radix-ui/react-slot",
			"@radix-ui/react-switch",
			"@radix-ui/react-tabs",
			"@radix-ui/react-toggle",
			"@radix-ui/react-toolbar",
			"@radix-ui/react-tooltip",
			"tailwindcss",
			"tailwind-merge",
			"clsx",
			"@tanstack/react-query",
			"xlsx",
			"suneditor",
			"suneditor-react",
			"react-advanced-cropper",
			"lucide-react",
			"dexie-react-hooks",
			"@hookform/resolvers",
			"tailwindcss",
			"dayjs",
			"tailwind-merge"
		],
	},
	headers: async () => {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Developed-By",
						value: "Abdulazimkhoja",
					},
				],
			},
		];
	},
};

const withBundleAnalyzer = BundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

// const withNextIntl = createNextIntlPlugin({
// 	experimental: {
// 		createMessagesDeclaration: "./messages/ru.json",
// 	},
// });

export default withBundleAnalyzer(
	// withNextIntl(
		nextConfig
	// )
);
