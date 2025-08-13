import { createUrl } from "@/shared/lib/formatters/url-formatter/createUrl";
import Image, { type ImageProps } from "next/image";
import FallbackImage from "public/image-placeholder.svg";

const imageHosts = {
	base: "https://backend.com",
};

export const NextImage = ({
	selectHost = "base",
	src = FallbackImage,
	...restProps
}: Props) => {
	let srcPath = src;

	if (selectHost && typeof src === "string") {
		srcPath = createUrl({
			baseUrl: imageHosts[selectHost],
			basePaths: [src],
		})().href;
	}

	return <Image src={srcPath} loading="lazy" {...restProps} />;
};

interface Props extends ImageProps {
	selectHost?: keyof typeof imageHosts | null;
}
