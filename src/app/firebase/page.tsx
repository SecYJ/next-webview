"use client";

import { DataProvider } from "@/providers/data-provider";
import DisplayData from "./_display-data";

const FirebasePage = () => {
	return (
		<DataProvider>
			<DisplayData />
		</DataProvider>
	);
};

export default FirebasePage;
