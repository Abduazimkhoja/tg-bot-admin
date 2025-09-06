"use client";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { updatePromoCode } from "@/api/promo-codes/api";
import type { PromoCodeItem } from "@/api/promo-codes/type";
import { Switch } from "@/shared/ui";

export const ToggleActive = ({ promoCode }: Props) => {
	const [pending, startTransition] = useTransition();
	const session = useSession();
	const [checked, setChecked] = useState(promoCode.isActive);

	const onSwitch = (checked: boolean) => {
		startTransition(async () => {
			setChecked(checked);
			try {
				await updatePromoCode({
					id: promoCode.id,
					body: {
						code: promoCode.code,
						discountPercent: promoCode.discountPercent,
						maxUsagePerUser: promoCode.maxUsagePerUser,
						isActive: checked,
					},
					token: session.data?.accessToken || "",
				});
			} catch (_error) {
				setChecked(!checked);
			}
		});
	};

	return (
		<Switch
			className="toggle-sm toggle-info"
			disabled={pending}
			onCheckedChange={onSwitch}
			checked={checked}
		/>
	);
};

interface Props {
	promoCode: PromoCodeItem;
}
