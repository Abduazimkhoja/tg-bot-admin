export const IMAGE_ACCEPTED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/svg+xml",
	"image/webp",
] as const;

export const IMAGE_MAX_SIZE_IN_MB = 2; // 2 MB
export const IMAGE_MAX_SIZE_IN_BYTES = IMAGE_MAX_SIZE_IN_MB * 1024 * 1024; // 2097152 bits
