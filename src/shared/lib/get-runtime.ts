export function getRuntime() {
	return typeof window === "undefined" ? "server" : "client";
}
