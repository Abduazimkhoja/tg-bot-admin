import { z } from "zod";
import {
	IMAGE_ACCEPTED_TYPES,
	IMAGE_MAX_SIZE_IN_BYTES,
	IMAGE_MAX_SIZE_IN_MB,
} from "@/constants/image.const";

const formatter = new Intl.ListFormat("ru", {
	style: "long",
	type: "disjunction",
});

const formattedList = formatter.format(
	IMAGE_ACCEPTED_TYPES.map((value) => value.replaceAll("image/", "")),
);

export const imageFileSchema = z
	.file("Загрузите файл")
	.mime(
		[...IMAGE_ACCEPTED_TYPES],
		`Не правильный формат!\n Поддерживаются следующие форматы изображений \n (${formattedList})`,
	)
	.max(
		IMAGE_MAX_SIZE_IN_BYTES,
		`Пожалуйста, выберите файл размером менее ${IMAGE_MAX_SIZE_IN_MB} МБ.`,
	);
