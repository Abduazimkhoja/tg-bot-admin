import {
	Car,
	CarIcon,
	Check,
	Search,
	Trash2,
	TriangleAlert,
} from "lucide-react";
import type { PageProps } from "next";
import Image from "next/image";
import NextImage from "public/next.svg";
import { searchParamsCache } from "@/shared/lib/cached-search-params";
import { request } from "@/shared/lib/request";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Checkbox,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogManual,
	DialogTitle,
	DialogTrigger,
	FormField,
	Input,
	Loading,
	PopoverContent,
	PopoverManual,
	PopoverTrigger,
	RadioGroup,
	RadioGroupItem,
	Select,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetManual,
	SheetTitle,
	SheetTrigger,
	Skeleton,
	Switch,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableManual,
	TableRow,
	Tabs,
	Tooltip,
	UploadImage,
} from "@/shared/ui";
import { Pagination } from "@/shared/ui/data-display/pagination";
import { Combobox } from "@/shared/ui/form/combobox";
import Cascader from "@/shared/ui/overlay/cascader";
import { ApiTest } from "./api-test";
import PreviewErrorMessage from "./preview-error-message";
import { PreviewSunEditor } from "./preview-sun-editor";

const Page = async ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	const { currentPage, perPage } = await searchParamsCache.parse(searchParams);

	const test = await request.get({
		endpoints: ["banners"],
	});

	const selectItems = [
		{
			label: "test@gmail.com",
			value: "test@gmail.com",
		},
		{
			label: "+9989755585558",
			value: "+9989755585558",
		},
		{
			label: "https://test.com",
			value: "https://test.com",
		},
	];

	return (
		<>
			<ApiTest />
			<div className="font-bold text-2xl mb-4">
				<span>Component info:</span>
				<a
					className="btn btn-link text-xl"
					href="https://daisyui.com/components"
					target="_blank"
					rel="noreferrer"
				>
					https://daisyui.com/components
				</a>
			</div>
			<div className="flex flex-col">
				<div className="flex gap-2">
					<Button className="btn-error w-fit">button</Button>
					<Button className="btn-success ">button</Button>
					<Button className="btn-info ">button</Button>
					<Button className="btn-warning ">button</Button>
					<Button className="btn-accent ">button</Button>
					<Button className="">button</Button>
					<Button className="btn-ghost">button</Button>
					<Button className="btn-neutral">button</Button>
					<Button className="btn-secondary">button</Button>
					<Button className="btn-primary">button</Button>
				</div>
				<div className="divider" />
				<div className="space-x-2">
					<Button className="btn-error btn-soft">button</Button>
					<Button className="btn-info btn-outline">button</Button>
					<Button className="btn-success btn-dash">button</Button>
				</div>
				<div className="divider" />
				<div className="flex gap-2">
					<Button className="btn-neutral btn-xl">button</Button>
					<Button className="btn-neutral btn-lg">button</Button>
					<Button className="btn-neutral">button</Button>
					<Button className="btn-neutral btn-sm">button</Button>
					<Button className="btn-neutral btn-xs">button</Button>
				</div>
				<div className="divider" />
				<div className="flex gap-2">
					<Button className="btn-error btn-square">
						<Trash2 size={20} />
					</Button>
					<Button className="btn-primary btn-circle">🧩</Button>
				</div>
				<div className="divider" />
				<div className="flex gap-2">
					<Button className="btn-success">
						Success <Check />
					</Button>
					<Button className="btn-info">
						<Car /> Delivery
					</Button>
				</div>
				<div className="divider" />
				<div className="flex gap-2">
					<Button className="btn-neutral btn-xl" loading={true}>
						button
					</Button>
					<Button className="btn-neutral" loading={true}>
						button
					</Button>
					<Button className="btn-neutral btn-xs" loading={true}>
						button
					</Button>
					<Button className="btn-info btn-square" loading={true}>
						🧩
					</Button>
					<Button className="btn-info btn-circle" loading={true}>
						🧩
					</Button>
				</div>
			</div>

			<div className="divider divider-primary ">Divider</div>

			<div className="flex gap-8">
				<div className="indicator indicator-top">
					<span className="indicator-item status status-xl status-success" />
					<div className="size-20 rounded-lg bg-black grid place-items-center">
						<span className="text-white">Indicator</span>
					</div>
				</div>

				<div className="indicator">
					<span className="indicator-item badge badge-primary">New</span>
					<div className="bg-base-300 grid size-20 place-items-center">
						content
					</div>
				</div>

				<div className="indicator">
					<span className="indicator-item badge badge-secondary">12</span>
					<Button className="btn-primary">button</Button>
				</div>

				<div className="indicator size-20">
					<span className="indicator-item indicator-middle indicator-center badge">
						info
					</span>
					<div className="bg-base-300 size-full grid place-items-center">
						Box
					</div>
				</div>

				<div className="indicator">
					<span className="indicator-item indicator-top indicator-start badge">
						↖︎
					</span>
					<span className="indicator-item indicator-top indicator-center badge">
						↑
					</span>
					<span className="indicator-item indicator-top indicator-end badge">
						↗︎
					</span>
					<span className="indicator-item indicator-middle indicator-start badge">
						←
					</span>
					<span className="indicator-item indicator-middle indicator-center badge">
						●
					</span>
					<span className="indicator-item indicator-middle indicator-end badge">
						→
					</span>
					<span className="indicator-item indicator-bottom indicator-start badge">
						↙︎
					</span>
					<span className="indicator-item indicator-bottom indicator-center badge">
						↓
					</span>
					<span className="indicator-item indicator-bottom indicator-end badge">
						↘︎
					</span>
					<div className="bg-base-300 grid h-32 w-60 place-items-center">
						Box
					</div>
				</div>
			</div>

			<div className="divider divider-primary ">Loading</div>
			<div className="flex flex-col gap-4">
				<Skeleton className="h-40" />
				<div className="flex gap-5">
					<Skeleton className="size-14 rounded-full" />
					<Skeleton className="w-40 h-5" />
				</div>

				<div className="flex gap-5">
					<Loading className="text-red-500 loading-xs" />
					<Loading className="text-blue-500 loading-sm" />
					<Loading className="text-yellow-500 loading-md" />
					<Loading className="text-purple-500 loading-lg" />
					<Loading className="text-green-500 loading-xl" />
					<Loading className="size-20" />
				</div>
				<div className="flex gap-5">
					<Loading className="loading-infinity loading-xs" />
					<Loading className="loading-infinity loading-sm" />
					<Loading className="loading-infinity loading-md" />
					<Loading className="loading-infinity loading-lg" />
					<Loading className="loading-infinity loading-xl" />
					<Loading className="loading-infinity size-20" />
				</div>
				<div className="flex gap-5">
					<Loading className="loading-bars loading-xs" />
					<Loading className="loading-bars loading-sm" />
					<Loading className="loading-bars loading-md" />
					<Loading className="loading-bars loading-lg" />
					<Loading className="loading-bars loading-xl" />
					<Loading className="loading-bars size-20" />
				</div>
				<div className="flex gap-5">
					<Loading className="loading-dots loading-xs" />
					<Loading className="loading-dots loading-sm" />
					<Loading className="loading-dots loading-md" />
					<Loading className="loading-dots loading-lg" />
					<Loading className="loading-dots loading-xl" />
					<Loading className="loading-dots size-20" />
				</div>
				<div className="flex gap-5">
					<Loading className="loading-ball loading-xs" />
					<Loading className="loading-ball loading-sm" />
					<Loading className="loading-ball loading-md" />
					<Loading className="loading-ball loading-lg" />
					<Loading className="loading-ball loading-xl" />
					<Loading className="loading-ball size-20" />
				</div>
			</div>

			<div className="divider divider-primary ">Accordion</div>

			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className="divider divider-primary ">Input</div>

			<label className="input">
				<span className="label">label</span>
				<Search />
				<Input className="grow" />
				text
			</label>

			<label className="input floating-label">
				<span>floating-label</span>
				<Input className="grow" />
			</label>

			<div className="flex flex-row gap-4 my-4">
				<Input className="input-xs" placeholder="xs" />
				<Input className="input-sm" placeholder="sm" />
				<Input placeholder="md" />
				<Input className="input-lg" placeholder="lg" />
				<Input className="input-xl" placeholder="xl" />
			</div>

			<FormField label="Label" error="Error message">
				<Input required placeholder="Type here" />
			</FormField>

			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend">Page title</legend>
				<input type="text" className="input" placeholder="My awesome page" />
				<p className="label">You can edit page title later on from settings</p>
			</fieldset>

			<div className="divider divider-primary">Select</div>

			<Select placeholder="Select value" items={selectItems} />

			<Select disabled placeholder="Select value" items={selectItems} />

			<Select firstSelected placeholder="Select value" items={selectItems} />

			<FormField label="Label" error="Error message">
				<Select placeholder="Select value" items={selectItems} />
			</FormField>

			<div className="flex flex-row gap-4 my-4">
				<Select
					className="input-xs input-error"
					placeholder="XS"
					items={selectItems}
				/>
				<Select
					className="input-sm input-info"
					placeholder="SM"
					items={selectItems}
				/>
				<Select
					className="input-primary"
					placeholder="MD"
					items={selectItems}
				/>
				<Select
					className="input-lg input-warning"
					placeholder="LG"
					items={selectItems}
				/>
				<Select
					className="input-xl input-accent"
					placeholder="XL"
					items={selectItems}
				/>
			</div>

			<div className="divider divider-primary">Popover</div>

			<div className="flex gap-5">
				<PopoverManual>
					<PopoverTrigger asChild>
						<Button>Popover</Button>
					</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</PopoverManual>

				<PopoverManual>
					<PopoverTrigger asChild>
						<Button>Popover User</Button>
					</PopoverTrigger>
					<PopoverContent>
						<h3 className="text-lg font-bold  text-center text-gray-600">
							User info
						</h3>
						<div className="divider border-gray-200 mt-1" />

						<ul className="w-60">
							<li className="flex items-center justify-between">
								<span>User name:</span>
								<span>John</span>
							</li>
							<li className="flex items-center justify-between">
								<span>Age:</span>
								<span>32</span>
							</li>
							<li className="flex items-center justify-between">
								<span>Phone:</span>
								<span>+99999999999</span>
							</li>
						</ul>
					</PopoverContent>
				</PopoverManual>

				<PopoverManual>
					<PopoverTrigger asChild>
						<Button>Popover Image</Button>
					</PopoverTrigger>
					<PopoverContent className="w-fit">
						<Image
							className="size-40"
							src={NextImage}
							width={200}
							height={200}
							alt="vercel logo"
						/>
					</PopoverContent>
				</PopoverManual>

				<PopoverManual>
					<PopoverTrigger asChild>
						<Button className="btn-square btn-error">
							<Trash2 size={22} />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-fit">
						<h4 className="mb-2 flex gap-1.5">
							<TriangleAlert size={20} className="text-orange-400" /> Точно
							удалить?
						</h4>
						<div className="flex gap-x-3 justify-end">
							<Button className="btn-sm">Отмена</Button>
							<Button className="btn-sm btn-info">Да</Button>
						</div>
					</PopoverContent>
				</PopoverManual>
			</div>

			<div className="divider divider-primary">Checkbox</div>

			<div className="flex flex-col gap-5">
				<div className="flex gap-5">
					<Checkbox
						defaultChecked
						className="checkbox-xs"
						afterElement={<span className="uppercase">xs</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-sm"
						afterElement={<span className="uppercase">sm</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-md"
						afterElement={<span className="uppercase">md</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-lg"
						afterElement={<span className="uppercase">lg</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-xl"
						afterElement={<span className="uppercase">xl</span>}
					/>
					<Checkbox
						defaultChecked
						className="size-20"
						afterElement={<span className="uppercase">custom</span>}
					/>
				</div>
				<div className="flex gap-5">
					<Checkbox
						defaultChecked
						className="checkbox-error"
						afterElement={<span>checkbox</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-error checkbox-dash"
						afterElement={<span>checkbox</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-error checkbox-outline"
						afterElement={<span>checkbox</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-error checkbox-soft"
						afterElement={<span>checkbox</span>}
					/>
				</div>

				<div className="flex gap-5">
					<Checkbox
						defaultChecked
						className="checkbox-info"
						indeterminate
						afterElement={<span>indeterminate</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-info checkbox-dash"
						indeterminate
						afterElement={<span>indeterminate</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-info checkbox-outline"
						indeterminate
						afterElement={<span>indeterminate</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-info checkbox-soft"
						indeterminate
						afterElement={<span>indeterminate</span>}
					/>
				</div>

				<div className="flex gap-5">
					<Checkbox
						defaultChecked
						className="checkbox-success"
						icon={<CarIcon />}
						afterElement={<span>icon</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-success checkbox-dash"
						icon={<CarIcon />}
						afterElement={<span>icon</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-success checkbox-outline"
						icon={<CarIcon />}
						afterElement={<span>icon</span>}
					/>
					<Checkbox
						defaultChecked
						className="checkbox-success checkbox-soft"
						icon={<CarIcon />}
						afterElement={<span>icon</span>}
					/>
				</div>
			</div>

			<div className="divider divider-primary">Checkbox</div>

			<div className="flex flex-col gap-4">
				<RadioGroup className="flex gap-5" defaultValue="option-one">
					<RadioGroupItem
						className="radio-error"
						afterElement={<span>Option 1</span>}
						value="option-1"
						id="option-1"
					/>
					<RadioGroupItem
						className="radio-dash"
						afterElement={<span>Option 2</span>}
						value="option-2"
						id="option-2"
					/>
					<RadioGroupItem
						className="radio-outline"
						afterElement={<span>Option 3</span>}
						value="option-3"
						id="option-3"
					/>
					<RadioGroupItem
						className="radio-soft"
						afterElement={<span>Option 4</span>}
						value="option-4"
						id="option-4"
					/>
				</RadioGroup>

				<RadioGroup className="flex gap-5" defaultValue="option-one">
					<RadioGroupItem
						className="radio-error radio-xs"
						afterElement={<span>Option 1</span>}
						value="option-1"
						id="option-1"
					/>
					<RadioGroupItem
						className="radio-dash radio-sm"
						afterElement={<span>Option 2</span>}
						value="option-2"
						id="option-2"
					/>
					<RadioGroupItem
						className="radio-outline radio-lg"
						afterElement={<span>Option 3</span>}
						value="option-3"
						id="option-3"
					/>
					<RadioGroupItem
						className="radio-soft radio-xl"
						afterElement={<span>Option 4</span>}
						value="option-4"
						id="option-4"
					/>
				</RadioGroup>
			</div>

			<div className="divider divider-primary">Switch</div>

			<div className="flex flex-col gap-5">
				<div className="flex gap-5">
					<Switch className="toggle-xs" />
					<Switch className="toggle-sm" />
					<Switch className="toggle-md" />
					<Switch className="toggle-lg" />
					<Switch className="toggle-xl" />
				</div>
				<div className="flex gap-5">
					<Switch />
					<Switch disabled />
					<Switch defaultChecked className="toggle-primary" />
					<Switch defaultChecked className="toggle-secondary" />
					<Switch defaultChecked className="toggle-accent" />
					<Switch defaultChecked className="toggle-neutral" />
					<Switch defaultChecked className="toggle-success" />
					<Switch defaultChecked className="toggle-warning" />
					<Switch defaultChecked className="toggle-info" />
					<Switch defaultChecked className="toggle-error" />
				</div>
			</div>

			<div className="divider divider-primary">Sheet</div>

			<SheetManual>
				<SheetTrigger asChild>
					<Button>Open</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Are you absolutely sure?</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</SheetManual>
			<SheetManual>
				<SheetTrigger asChild>
					<Button>Left</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Are you absolutely sure?</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</SheetManual>
			<SheetManual>
				<SheetTrigger asChild>
					<Button>Bottom</Button>
				</SheetTrigger>
				<SheetContent className="h-80" side="bottom">
					<SheetHeader>
						<SheetTitle>Are you absolutely sure?</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</SheetManual>

			<div className="divider divider-primary">Cascader</div>

			<Cascader />

			<div className="divider divider-primary">Table</div>
			<div>
				<TableManual>
					{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
					</TableBody>
				</TableManual>
				<Pagination totalPages={200} />
			</div>

			<div className="divider divider-primary">Tooltip</div>

			<div className="flex flex-wrap gap-x-5 gap-y-14 mt-16">
				<Tooltip message="Hello world">
					<Button>Tooltip</Button>
				</Tooltip>
				<Tooltip className="tooltip-primary tooltip-open" message="Hello world">
					<Button>Tooltip primary</Button>
				</Tooltip>
				<Tooltip
					className="tooltip-secondary tooltip-open"
					message="Hello world"
				>
					<Button>Tooltip secondary</Button>
				</Tooltip>
				<Tooltip className="tooltip-accent tooltip-open" message="Hello world">
					<Button>Tooltip accent</Button>
				</Tooltip>
				<Tooltip className="tooltip-info tooltip-open" message="Hello world">
					<Button>Tooltip info</Button>
				</Tooltip>
				<Tooltip className="tooltip-success tooltip-open" message="Hello world">
					<Button>Tooltip success</Button>
				</Tooltip>
				<Tooltip className="tooltip-warning tooltip-open" message="Hello world">
					<Button>Tooltip warning</Button>
				</Tooltip>
				<Tooltip className="tooltip-error tooltip-open" message="Hello world">
					<Button>Tooltip error</Button>
				</Tooltip>
			</div>

			<div className="my-16 flex flex-col gap-4 flex-center">
				<Tooltip className="tooltip-open" side="top" message="Hello world">
					<Button>Tooltip</Button>
				</Tooltip>
				<Tooltip className="tooltip-open" side="right" message="Hello world">
					<Button>Tooltip</Button>
				</Tooltip>
				<Tooltip className="tooltip-open" side="left" message="Hello world">
					<Button>Tooltip</Button>
				</Tooltip>
				<Tooltip className="tooltip-open" side="bottom" message="Hello world">
					<Button>Tooltip</Button>
				</Tooltip>
			</div>

			<div className="divider divider-primary">Dialog</div>

			<DialogManual>
				<DialogTrigger asChild>
					<Button>Open Dialog</Button>
				</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>

						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>

					<div>content</div>
				</DialogContent>
			</DialogManual>

			<div className="divider divider-primary">Image upload</div>

			<UploadImage autoUpload showToast multiple />

			<div className="divider divider-primary">Sun Editor</div>

			<PreviewSunEditor />

			<div className="divider divider-primary">Combobox</div>

			<Combobox
				items={[
					{
						value: "react",
						label: "React",
					},
					{
						value: "svelte",
						label: "Svelte",
					},
					{
						value: "vue",
						label: "Vue",
					},
					{
						value: "angular",
						label: "Angular",
					},
					{
						value: "ember",
						label: "Ember",
					},
				]}
			/>

			<div className="divider divider-primary">Error message</div>

			<PreviewErrorMessage />

			<div className="divider divider-primary">Tabs</div>

			<Tabs
				items={[
					{
						value: "tab1",
						label: "Tab 1",
						children: "Tab 1 content",
					},
					{
						value: "tab2",
						label: "Tab 2",
						children: "Tab 2 content",
					},
					{
						value: "tab3",
						label: "Tab 3",
						children: "Tab 3 content",
					},
				]}
			/>
		</>
	);
};

export default Page;
