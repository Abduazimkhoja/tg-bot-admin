"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { deleteCategory } from "@/api/categories/api";
import { searchParamsParsers } from "@/shared/lib/cached-search-params";
import { DeleteButton } from "@/shared/ui/form/delete-button";

export const DeleteCategory = ({ categoryId, elementsCount }: Props) => {
	const session = useSession();
	const token = session.data?.accessToken || "";
	const router = useRouter();
	const [page, setPage] = useQueryState("page", searchParamsParsers.page);

	const onDelete = async () => {
		await deleteCategory({ id: categoryId, token });

		if (elementsCount === 1) {
			return setPage(page > 1 ? page - 1 : page);
		}

		router.refresh();
	};

	return <DeleteButton onDelete={onDelete} className="size-7" />;
};

interface Props {
	elementsCount: number;
	categoryId: number;
}
