"use client";

import "suneditor/dist/css/suneditor.min.css";
import { useState } from "react";
import { SunEditor } from "@/shared/ui";

export const PreviewSunEditor = () => {
	const [value, setValue] = useState("");

	return (
		<div>
			<SunEditor onChange={setValue} />
			<div className="py-3 text-xl font-bold">
				<span>Preview</span>
				<div
					className="sun-editor-editable p-4 border border-gray-200 rounded-lg"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: no lint
					dangerouslySetInnerHTML={{ __html: value }}
				/>
			</div>
		</div>
	);
};
