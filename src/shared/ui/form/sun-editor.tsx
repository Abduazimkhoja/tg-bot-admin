"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";
import { Skeleton } from "../feedback/skeleton";

const SunEditorManual = dynamic(() => import("suneditor-react"), {
	ssr: false,
	loading: () => <Skeleton className="h-[415px] w-full" />,
});

export const SunEditor = ({
	className,
	wrapperClass,
	...restEditorProps
}: Props) => {
	return (
		<div className={cn("*:font-[inherit]!", wrapperClass)}>
			<SunEditorManual
				// lang="ru"
				setOptions={{
					className,
					minHeight: "300px",
					showPathLabel: false,
					imageUploadHeader: {
						test: "hello",
					},
					imageAccept:
						"image/jpeg,image/png,image/webp,image/avif,image/svg+xml",
					imageUploadSizeLimit: 2 * 10 ** 6,
					imageMultipleFile: true,
					paragraphStyles: ["bordered", "spaced"],
					formats: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
					buttonList: [
						["undo", "redo"],
						["font", "fontSize", "formatBlock"],
						[
							"bold",
							"underline",
							"italic",
							"strike",
							// "subscript",
							// "superscript",
						],
						[
							"fontColor",
							"hiliteColor",
							// "textStyle"
							// "paragraphStyle",
							"blockquote",
						],
						["align", "horizontalRule", "list", "lineHeight"],
						// ["outdent", "indent"],
						["link", "image"],
						// ["fullScreen", "preview"],
						["removeFormat"],
					],
				}}
				placeholder="Type or paste your content here!"
				{...restEditorProps}
			/>
		</div>
	);
};

interface Props
	extends Pick<
		ComponentProps<typeof SunEditorManual>,
		| "onChange"
		| "placeholder"
		| "defaultValue"
		| "width"
		| "height"
		| "lang"
		| "setContents"
	> {
	wrapperClass?: string;
	className?: string;
}
