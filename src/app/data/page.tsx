"use client";

import { DataProvider } from "@/providers/data-provider";
import Count from "./_count";

const DataPage = () => {
	return (
		<DataProvider>
			<Count />
		</DataProvider>
	);
};

export default DataPage;
