"use client";

import { useEffect, useTransition as useReactTransition } from "react";
import { create } from "zustand";

type State = {
	isRefetching: boolean;
	setRefetching: (val: boolean) => void;
};

export const usePageRefetchStore = create<State>((set) => ({
	isRefetching: false,
	setRefetching: (val) => set({ isRefetching: val }),
}));

export function useTransition() {
	const [isPending, startTransition] = useReactTransition();
	const { setRefetching, isRefetching } = usePageRefetchStore((s) => s);

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need
	useEffect(() => {
		if (isPending === isRefetching) return;

		setRefetching(isPending);
		document.documentElement.dataset.refetching = String(isPending);
	}, [isPending, setRefetching]);

	return [isPending, startTransition] as const;
}
