import { isPlainObject } from "./is-plain-object";

export function findKey<T>(
	item: Record<string, unknown> | Record<string, unknown>[] | undefined,
	searchedKey: string,
	depth = 2,
): T | undefined {
	if (depth < 0) return undefined;

	// Проверяем, является ли текущий объект пустым или не объектом
	if (!isPlainObject(item)) {
		return undefined;
	}

	if (Array.isArray(item)) {
		return findKey<T>(item?.[0] || {}, searchedKey, depth - 1);
	}

	// Если ключ 'message' найден непосредственно в текущем объекте, возвращаем его
	if (Object.hasOwn(item, searchedKey)) {
		return item[searchedKey] as T; // Приводим тип, так как obj[searchedKey] теперь точно string
	}

	// Проходимся по всем свойствам объекта
	for (const key in item) {
		// Убедимся, что это собственное свойство объекта (не из прототипа)
		if (Object.hasOwn(item, key)) {
			const value = item[key];

			// Если значение является объектом или массивом, рекурсивно вызываем функцию
			if (typeof value === "object" && value !== null) {
				// Если значение - массив, перебираем его элементы
				if (Array.isArray(value)) {
					for (const item of value) {
						const result = findKey<T>(item, searchedKey, depth - 1);
						if (result !== undefined) {
							return result; // Если нашли 'message' в элементе массива, возвращаем
						}
					}
				} else {
					// Если значение - обычный объект, рекурсивно ищем в нем
					const result = findKey<T>(
						value as Record<string, unknown>,
						searchedKey,
						depth - 1,
					);
					if (result !== undefined) {
						return result; // Если нашли 'message' во вложенном объекте, возвращаем
					}
				}
			}
		}
	}

	// Если 'message' не найден ни в текущем объекте, ни во вложенных
	return undefined;
}
