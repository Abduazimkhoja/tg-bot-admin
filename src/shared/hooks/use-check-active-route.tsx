import { usePathname } from "next/navigation";

export const useCheckActiveRoute = () => {
	const pathname = usePathname();

	return (link: string) => pathname.includes(link);
};
