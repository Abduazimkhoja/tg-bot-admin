"use client";
import { ChevronRight } from "lucide-react";
import Cascader, { Panel } from "rc-cascader";
import { Loading } from "../feedback/loading";
import addressOptions from "./data.json";

// import "./style.css";

export default () => {
	// const [value2, setValue2] = useState<number[][]>([]);

	// =================== Multiple ====================

	// console.log("value2", value2);

	return (
		<>
			<Cascader
				// defaultOpen={true}
				// open={true}
				// loadingIcon={<Loading className="loading loading-infinity" />}
				// expandIcon={<ChevronRight />}
				showSearch
				checkable
				options={addressOptions}
				onChange={(nextValue) => {
					console.log(nextValue);

					// console.log("Change:", nextValue);
					// setValue2(nextValue);
				}}
				// changeOnSelect

				expandTrigger="hover"
				loadData={() => console.log("loadData")}
			/>
			<h1>Panel</h1>
			<Panel
				loadingIcon={<Loading className="" />}
				checkable
				// value={value2}
				options={addressOptions}
				expandTrigger="hover"
				expandIcon={<ChevronRight />}
				onChange={(nextValue) => {
					console.log(nextValue);

					// console.log("Change:", nextValue);
					// setValue2(nextValue);
				}}
			/>
		</>
	);
};

// type test = Omit<ComponentProps<typeof Cascader>, keyof ComponentProps<"div">>;
// const l: test = {
// 	allowClear: true,
// 	animation: "",
// 	autoClearSearchValue: true,
// 	builtinPlacements: {},
// 	loading: true,
// 	open: true,
// 	checkable: true,
// 	loadingIcon: true,
// 	expandIcon: true,
// 	changeOnSelect: true,
// 	choiceTransitionName: "",
// 	defaultOpen: true,
// };
