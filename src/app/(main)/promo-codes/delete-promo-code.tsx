"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deletePromoCode } from "@/api/promo-codes/api";
import { DeleteButton } from "@/shared/ui/form/delete-button";

export const DeletePromoCode = ({ promoCodeId }: Props) => {
	const session = useSession();
	const token = session.data?.accessToken || "";
	const router = useRouter();

	const onDelete = async () => {
		await deletePromoCode({ id: promoCodeId, token });

		router.refresh();
	};

	return <DeleteButton onDelete={onDelete} className="size-7" />;
};

interface Props {
	promoCodeId: number;
}
