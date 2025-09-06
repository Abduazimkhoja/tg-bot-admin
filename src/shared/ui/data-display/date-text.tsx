"use client";
import { formatDate } from "@/shared/lib/formatters/dateFormatter";

export const DateText = ({ date }: Props) => {
	return formatDate(date);
};

interface Props {
	date: string | Date;
}
