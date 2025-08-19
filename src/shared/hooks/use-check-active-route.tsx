import { usePathname } from "next/navigation";

export const useCheckActiveRoute = () => {
	const pathname = usePathname();

	return (link: string) =>
		link === "/" ? pathname === link : pathname.includes(link);
};
