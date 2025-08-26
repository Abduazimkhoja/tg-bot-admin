"use client";

import { useEffect, useTransition as useReactTransition } from "react";
import { create } from "zustand";

type State = {
	isRefetching: boolean;
	setRefetching: (val: boolean) => void;
};

export const useRefetchStore = create<State>((set) => ({
	isRefetching: false,
	setRefetching: (val) => set({ isRefetching: val }),
}));

export const useTransition = () => {
	const [isPending, startTransition] = useReactTransition();
	const setRefetching = useRefetchStore((s) => s.setRefetching);

	useEffect(() => {
		setRefetching(isPending);
	}, [isPending, setRefetching]);

	// сразу обновляем DOM
	useEffect(() => {
		document.documentElement.dataset.refetching = String(isPending);
	}, [isPending]);

	return [isPending, startTransition] as const;
};
