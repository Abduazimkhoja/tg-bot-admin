import { CircleQuestionMark } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import type { ProductForm } from "@/api/products/type";
import { FormField, Popover, UploadImage } from "@/shared/ui";

export const UploadProductImages = ({ control, error }: Props) => {
	const { fields, remove, append } = useFieldArray({
		name: "images",
		control,
	});

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
			<UploadImage
				wrapperClassName="aspect-[4/5] w-auto h-60"
				onRemove={remove}
				value={fields.map(({ image }) => image)}
				onChange={(files) => append(files.map((file) => ({ image: file })))}
				multiple
				limit={10}
			/>
		</FormField>
	);
};

interface Props {
	error?: string;
	control: Control<ProductForm>;
}
