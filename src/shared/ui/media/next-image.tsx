import Image, { type ImageProps } from "next/image";
import FallbackImage from "public/image-placeholder.svg";
import { ENV } from "@/constants/env.const";

export const NextImage = ({
	hostName = "imageUrl",
	src = FallbackImage,
	...restProps
}: Props) => {
	let srcPath = typeof src === "string" && !src?.trim() ? FallbackImage : src;

	if (
		hostName &&
		typeof src === "string" &&
		!!src?.trim() &&
		!src.includes("http") &&
		!src.includes("blob:")
	) {
		srcPath = ENV[hostName]({ endpoints: [src] }).href;
	}

	return <Image src={srcPath} loading="lazy" {...restProps} />;
};

interface Props extends ImageProps {
	hostName?: keyof typeof ENV | null;
}
