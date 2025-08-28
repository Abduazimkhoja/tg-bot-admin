import { ChevronLeft } from "lucide-react";
import type { PageProps } from "next";
import { getByIdProduct } from "@/api/products/api";
import { ROUTES_LIST } from "@/constants/routes-list.const";
import { LinkButton } from "@/shared/ui";
import { PageHead } from "@/shared/ui/layout/page-head";
import { FormSaveButton } from "./form-save-button";
import { ProductsForm } from "./products-form";

const Page = async ({ params }: PageProps<{ id: string }>) => {
	const { id } = await params;
	const isUpdate = Number.isFinite(+id);

	const productResponse = isUpdate
		? await getByIdProduct({ id: Number(id) })
		: undefined;
	console.log(productResponse?.data);

	return (
		<>
			<PageHead
				title={isUpdate ? "Редактирование продукта" : "Создание продукта"}
				className=" justify-start gap-3"
			>
				<LinkButton className="btn-square -order-1" href={ROUTES_LIST.products}>
					<ChevronLeft />
				</LinkButton>
				<FormSaveButton />
			</PageHead>

			<section className="main-content">
				<ProductsForm product={productResponse?.data} />
			</section>
		</>
	);
};

export default Page;
