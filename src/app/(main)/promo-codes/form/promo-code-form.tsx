"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createPromoCode, updatePromoCode } from "@/api/promo-codes/api";
import { promoCodeBodySchema } from "@/api/promo-codes/schema";
import type { PromoCodeItem, PromoCodesBody } from "@/api/promo-codes/type";
import { requestErrorHandler } from "@/shared/lib/request";
import { Button, FormField, Input, SheetClose } from "@/shared/ui";

export const CategoryForm = ({
	promoCode,
	pending,
	startTransition,
}: Props) => {
	const session = useSession();
	const token = session.data?.accessToken || "";
	const router = useRouter();
	const sheetCloseRef = useRef<HTMLButtonElement>(null);

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<PromoCodesBody>({
		resolver: zodResolver(promoCodeBodySchema),
		defaultValues: {
			code: promoCode?.code,
			discountPercent: promoCode?.discountPercent,
			maxUsagePerUser: promoCode?.maxUsagePerUser,
			isActive:
				typeof promoCode?.isActive === "boolean" ? promoCode?.isActive : true,
		},
	});

	const onSubmit = ({
		code,
		discountPercent,
		maxUsagePerUser,
		isActive,
	}: PromoCodesBody) => {
		startTransition(async () => {
			try {
				if (promoCode) {
					await updatePromoCode({
						id: promoCode.id,
						body: {
							code,
							discountPercent,
							maxUsagePerUser,
							isActive,
						},
						token,
					});
				} else {
					await createPromoCode({
						body: {
							code,
							discountPercent,
							maxUsagePerUser,
							isActive,
						},
						token,
					});
				}

				router.refresh();
				sheetCloseRef.current?.click();
			} catch (error) {
				const { errorMessage } = await requestErrorHandler(error);
				toast.error(errorMessage.ru);
			}
		});
	};

	const onError = (error: FieldErrors) => {
		console.log(error);
	};

	return (
		<>
			<SheetClose ref={sheetCloseRef} className="hidden" />
			<form className="px-5" onSubmit={handleSubmit(onSubmit, onError)}>
				<FormField required label="Промокод" error={errors?.code?.message}>
					<Input
						{...register("code")}
						placeholder="Введите промокод"
						type="text"
					/>
				</FormField>
				<FormField
					required
					label="Процент скидки"
					error={errors?.discountPercent?.message}
				>
					<span className="input">
						<Input
							{...register("discountPercent", { valueAsNumber: true })}
							className="grow"
							placeholder="Введите процент скидки"
							type="number"
							inputMode="numeric"
						/>
						%
					</span>
				</FormField>
				<FormField
					required
					label="Число использований"
					error={errors?.maxUsagePerUser?.message}
				>
					<Input
						{...register("maxUsagePerUser", { valueAsNumber: true })}
						placeholder="Введите число использований"
						type="number"
						inputMode="numeric"
					/>
				</FormField>

				<Button
					loading={pending}
					type="submit"
					className="btn-info w-full mt-5"
				>
					Сохранить
				</Button>
			</form>
		</>
	);
};

interface Props {
	pending: boolean;
	startTransition: (callback: () => void) => void;
	promoCode?: PromoCodeItem;
}
