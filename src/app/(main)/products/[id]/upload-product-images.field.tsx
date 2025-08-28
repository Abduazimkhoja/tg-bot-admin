import { CircleQuestionMark } from "lucide-react";
import { type Control, Controller } from "react-hook-form";
import type { ProductForm, ProductItem } from "@/api/products/type";
import { ENV } from "@/constants/env.const";
import { FormField, Popover, UploadImage } from "@/shared/ui";

export const UploadProductImages = ({ control, images, error }: Props) => {
	return (
		<FormField
			required
			htmlFor="image"
			wrappedLabel={false}
			label={
				<>
					Фото
					<Popover
						triggerProps={{ tabIndex: 0 }}
						label={
							<CircleQuestionMark className="text-gray-400 size-5 ml-2 hover:text-blue-300" />
						}
					>
						Соотношение сторон должно быть 4:5
					</Popover>
				</>
			}
			error={error}
		>
			<Controller
				control={control}
				name="images"
				render={({ field }) => (
					<UploadImage
						wrapperClassName="aspect-[4/5] w-auto h-60"
						onRemove={() => field.onChange(undefined)}
						onChange={field.onChange}
						multiple
						limit={10}
						defaultValue={images?.map(
							(image) => ENV.imageUrl({ endpoints: [image] }).href,
						)}
					/>
				)}
			/>
		</FormField>
	);
};

interface Props {
	error?: string;
	control: Control<ProductForm>;
	images: ProductItem["images"];
}
