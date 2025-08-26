import { z } from "zod";
import { imageFileSchema } from "./image-file-schema";

export const imageFileValidation = <T extends File | File[]>(uploadFile: T) => {
	if (Array.isArray(uploadFile)) {
		return z.array(imageFileSchema).safeParse(uploadFile);
	}

	return imageFileSchema.safeParse(uploadFile);
};
