export type TPath = string | number | undefined;

export const formatterPaths = (...restPaths: (TPath[] | undefined)[]) => {
	if (!restPaths) return "";
	let formattedPath = "";

	for (const paths of restPaths) {
		if (!paths || paths.length === 0) continue;

		for (const path of paths) {
			if (!path) continue;
			const cleanedPath =
				typeof path === "number" ? path : path.trim().replace(/^\/|\/$/g, "");
			formattedPath = `${formattedPath}/${cleanedPath}`;
		}
	}

	return formattedPath;
};
