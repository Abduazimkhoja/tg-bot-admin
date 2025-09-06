import { Pen } from "lucide-react";
import { getAllPromoCodes } from "@/api/promo-codes/api";
import { auth } from "@/auth";
import {
	Button,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableManual,
	TableRow,
} from "@/shared/ui";
import { DateText } from "@/shared/ui/data-display/date-text";
import { DeletePromoCode } from "./delete-promo-code";
import { PromoCodeFormSheet } from "./form/promo-code-form-sheet";
import { ToggleActive } from "./toggle-active";

export const PageTable = async () => {
	const user = await auth();
	const token = user?.accessToken || "";

	const { data: promoCodes } = await getAllPromoCodes({ token });

	return (
		<TableManual className="animate-with-page-pending overflow-auto">
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead>Промокод</TableHead>
					<TableHead>Процент скидки</TableHead>
					<TableHead>Число использований</TableHead>
					<TableHead>Дата создания</TableHead>
					<TableHead>Состояние</TableHead>
					<TableHead>Действия</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{promoCodes.map((promoCode) => (
					<TableRow key={promoCode.id}>
						<TableCell>{promoCode.code}</TableCell>
						<TableCell className="text-center">
							<span className="badge badge-success badge-soft">
								{promoCode.discountPercent}%
							</span>
						</TableCell>
						<TableCell className="text-center">
							<span className="badge badge-info badge-soft">
								{promoCode.maxUsagePerUser} раз
							</span>
						</TableCell>
						<TableCell>
							<DateText date={promoCode.createdAt} />
						</TableCell>
						<TableCell className="text-center">
							<ToggleActive promoCode={promoCode} />
						</TableCell>
						<TableCell className="space-x-2">
							<PromoCodeFormSheet
								promoCode={promoCode}
								title="Редактировать баннер"
								trigger={
									<Button className="btn-square size-7 btn-info">
										<Pen className="size-[55%]" />
									</Button>
								}
							/>
							<DeletePromoCode promoCodeId={promoCode.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</TableManual>
	);
};
