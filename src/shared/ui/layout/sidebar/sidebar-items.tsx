import { cn } from "@/shared/lib/cn";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	NavLink,
} from "@/shared/ui";
import type { SidebarData } from "./sidebar-data";

export const SidebarItems = ({ className, items }: Props) => {
	// if (items.link === undefined && !items.children) return;

	return items.map(
		({ value, link, children, icon: Icon, label, hide }) =>
			!hide && (
				<li key={value} className={cn(className)}>
					{!children ? (
						<NavLink
							className={cn(
								"flex items-center gap-2 py-2 px-4 text-base leading-normal rounded-xl hover:bg-blue-400 hover:text-white",
							)}
							activeClass="bg-blue-400 text-white"
							href={link || ""}
						>
							<Icon size={20} />
							{label}
						</NavLink>
					) : (
						<Accordion type="single" collapsible>
							<AccordionItem value={value}>
								<AccordionTrigger
									className={cn(
										"flex items-center gap-2 py-2 px-4 text-base leading-normal rounded-xl hover:bg-blue-400 hover:text-white",
									)}
								>
									<Icon size={20} />
									{label}
								</AccordionTrigger>
								<AccordionContent>
									<ul className="ml-5 pl-2 border-l border-gray-300">
										<SidebarItems items={children} />
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					)}
				</li>
			),
	);
};

interface Props {
	className?: string;
	items: SidebarData;
}
