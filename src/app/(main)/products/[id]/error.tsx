"use client";

import { Frown } from "lucide-react";

const Page = (error: { error: Error; reset: () => void }) => {
	return (
		<div className="flex-center flex-col gap-2 mb-80 h-full">
			<Frown className="size-20 text-gray-200" />
			<h2 className="text-2xl font-bold text-slate-500">Произошла ошибка</h2>
			<p className="bg-gray-100 px-5 py-4 rounded-lg text-sm max-w-lg text-balance text-center">
				<span className="text-error">{error.error.message}</span>
			</p>
		</div>
	);
};

export default Page;
