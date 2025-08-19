"use client";
import { useSession } from "next-auth/react";
import { request } from "@/shared/lib/request";
import { Button } from "@/shared/ui";

export const ApiTest = () => {
	const session = useSession();

	return (
		<div>
			<Button
				onClick={() => {
					request.get({
						endpoints: ["banners"],
					});
				}}
			>
				GET
			</Button>
			<Button
				onClick={() => {
					request.post({
						token: session.data?.accessToken,
						endpoints: ["categories"],
						json: {
							name: {
								en: "string",
								ru: "string",
								uz: "string",
							},
							imageUrl: "string",
						},
					});
				}}
			>
				POST
			</Button>
			{/* <Button onClick={() => {
		request.
	}}>PATCH</Button>
	<Button onClick={() => {
		request.
	}}>DELETE</Button> */}
		</div>
	);
};
