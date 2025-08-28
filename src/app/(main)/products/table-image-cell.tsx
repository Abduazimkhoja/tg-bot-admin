import { NextImage } from "@/shared/ui";
import { ViewImage } from "@/shared/ui/overlay/view-image";

export const TableImageCell = ({ imageUrl = "" }: Props) => {
	return (
		<div className="relative size-8 overflow-hidden border border-gray-100 rounded-lg">
			<NextImage
				className="size-full object-contain"
				src={imageUrl}
				alt="category"
				width={32}
				height={32}
			/>
			<div className="absolute inset-0 flex-center z-10">
				<ViewImage
					triggerClassName="btn-xs btn-active opacity-0 hover:opacity-100 transition-opacity"
					imageUrl={imageUrl}
				/>
			</div>
		</div>
	);
};

interface Props {
	imageUrl: string | undefined;
}
