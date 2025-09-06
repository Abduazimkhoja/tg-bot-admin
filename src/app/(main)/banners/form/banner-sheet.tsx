import type { ReactNode } from "react";
import type { BannerItem } from "@/api/banners/type";
import {
	SheetContent,
	SheetHeader,
	SheetManual,
	SheetTitle,
	SheetTrigger,
} from "@/shared/ui";
import { BannerForm } from "./banner-form";

export const BannerSheet = ({ banner, title, trigger }: Props) => {
	return (
		<SheetManual>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className="w-fit">
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>

				<BannerForm banner={banner} />
			</SheetContent>
		</SheetManual>
	);
};

interface Props {
	banner?: BannerItem;
	title: string;
	trigger: ReactNode;
}
