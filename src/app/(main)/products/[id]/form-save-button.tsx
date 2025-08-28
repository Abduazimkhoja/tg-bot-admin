"use client";
import { usePageRefetchStore } from "@/shared/hooks";
import { Button } from "@/shared/ui";

export const FormSaveButton = () => {
	const pending = usePageRefetchStore((state) => state.isRefetching);
	return (
		<Button
			loading={pending}
			form="product-form"
			type="submit"
			className="btn-info ml-auto"
		>
			Сохранить
		</Button>
	);
};
