"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { CircleQuestionMark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { createBanner, updateBanner } from "@/api/banners/api";
import { bannerFormSchema } from "@/api/banners/schema";
import type { BannerItem, BannersForm } from "@/api/banners/type";
import { createFiles } from "@/api/file/api";
import { API_ENDPOINTS } from "@/constants/api.const";
import { ENV } from "@/constants/env.const";
import { useTransition } from "@/shared/hooks";
import { findKey } from "@/shared/lib/find-key";
import {
	Button,
	FormField,
	Popover,
	SheetClose,
	UploadImage,
} from "@/shared/ui";

export const BannerForm = ({ banner }: Props) => {
	const session = useSession();
	const token = session.data?.accessToken || "";
	const sheetCloseRef = useRef<HTMLButtonElement>(null);
	const queryClient = useQueryClient();
	const [pending, startTransition] = useTransition();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<BannersForm>({
		resolver: zodResolver(bannerFormSchema),
		defaultValues: {
			image: banner?.imageUrl,
		},
	});

	const onSubmit = ({ image }: BannersForm) => {
		startTransition(async () => {
			let imageUrl = "";

			if (typeof image !== "string") {
				const imageResponse = await createFiles({
					files: [image],
					token,
				});

				imageUrl = imageResponse.data[0].path;
			} else {
				imageUrl = image;
			}

			if (banner) {
				await updateBanner({
					id: banner.id,
					body: {
						imageUrl,
					},
					token,
				});
			} else {
				await createBanner({
					body: {
						imageUrl,
					},
					token,
				});
			}

			queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.banners] });
			sheetCloseRef.current?.click();
		});
	};

	return (
		<>
			<SheetClose ref={sheetCloseRef} className="hidden" />
			<form className="px-5" onSubmit={handleSubmit(onSubmit)}>
				<FormField
					htmlFor="image"
					wrappedLabel={false}
					label={
						<>
							Фото
							<Popover
								label={
									<CircleQuestionMark className="text-gray-400 size-5 ml-2 hover:text-blue-300" />
								}
							>
								Соотношение сторон должно быть 2:1
							</Popover>
						</>
					}
					error={findKey(errors?.image, "message")}
				>
					<Controller
						control={control}
						name="image"
						render={({ field }) => (
							<UploadImage
								wrapperClassName="aspect-[2/1] w-auto"
								onRemove={() => field.onChange(undefined)}
								onChange={field.onChange}
								multiple={false}
								defaultValue={
									banner?.imageUrl &&
									ENV.imageUrl({ endpoints: [banner?.imageUrl] }).href
								}
							/>
						)}
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
	banner?: BannerItem;
}
