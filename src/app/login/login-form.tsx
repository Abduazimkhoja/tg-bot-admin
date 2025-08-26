"use client";

import { EyeIcon, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { LoginBody } from "@/api/login/type";
import { ROUTES_LIST } from "@/constants/routes-list.const";
import { Button, FormField, Input } from "@/shared/ui";

export default function LoginForm() {
	const [pending, startTransition] = useTransition();
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginBody>();

	const onSubmit = async ({ username, password }: LoginBody) => {
		startTransition(async () => {
			const result = await signIn("credentials", {
				redirect: false,
				username,
				password,
			});

			if (result?.error) {
				toast.error(result.error);
			} else {
				const callbackUrl = new URL(result?.url || "");
				const redirectUrl =
					callbackUrl?.searchParams.get("callbackUrl") || ROUTES_LIST.home;

				router.push(redirectUrl);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormField
				label="Логин"
				error={errors.username?.message}
				labelClassName="text-sm text-gray-300"
			>
				<Input
					{...register("username")}
					type="text"
					placeholder="admin"
					className="w-full"
				/>
			</FormField>
			<FormField
				label="Пароль"
				error={errors.password?.message}
				labelClassName="text-sm text-gray-300"
			>
				<label className="input w-full">
					<Input
						{...register("password")}
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						className="grow"
					/>
					<button
						className="hover:text-blue-400 text-gray-600 transition-colors"
						onClick={() => setShowPassword(!showPassword)}
						type="button"
					>
						{showPassword ? <EyeOff /> : <EyeIcon />}
					</button>
				</label>
			</FormField>

			<Button
				loading={pending}
				type="submit"
				className="btn-info w-full mt-5 disabled:bg-gray-400! "
			>
				Войти
			</Button>
		</form>
	);
}
