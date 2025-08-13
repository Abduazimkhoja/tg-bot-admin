"use client";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

interface FormInputs {
	singleErrorInput: string;
}

export default function PreviewErrorMessage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormInputs>();
	const onSubmit = (data: FormInputs) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register("singleErrorInput", { required: "This is required." })}
			/>
			<ErrorMessage errors={errors} name="singleErrorInput" />

			<ErrorMessage
				errors={errors}
				name="singleErrorInput"
				render={({ message }) => <p className="text-red-500">{message}</p>}
			/>

			<input type="submit" />
		</form>
	);
}
