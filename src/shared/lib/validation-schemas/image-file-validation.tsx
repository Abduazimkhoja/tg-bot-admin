import { array, file, maxSize, mimeType, pipe, safeParse } from "valibot";
import {
	IMAGE_ACCEPTED_TYPES,
	IMAGE_MAX_SIZE_IN_BYTES,
	IMAGE_MAX_SIZE_IN_MB,
} from "@/constants/image.const";

export const imageFileValidation = <T extends File | File[]>(uploadFile: T) => {
	const formatter = new Intl.ListFormat("ru", {
		style: "long",
		type: "disjunction",
	});

	const formattedList = formatter.format(
		IMAGE_ACCEPTED_TYPES.map((value) => value.replaceAll("image/", "")),
	);

	const imageFileSchema = pipe(
		file(),
		mimeType(
			IMAGE_ACCEPTED_TYPES,
			`Не правильный формат!\n Поддерживаются следующие форматы изображений \n (${formattedList})`,
		),
		maxSize(
			IMAGE_MAX_SIZE_IN_BYTES,
			`Пожалуйста, выберите файл размером менее ${IMAGE_MAX_SIZE_IN_MB} МБ.`,
		),
	);

	if (Array.isArray(uploadFile)) {
		return safeParse(array(imageFileSchema), uploadFile);
	}

	return safeParse(imageFileSchema, uploadFile);
};
