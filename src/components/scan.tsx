"use client";

import { useEffect } from "react";
import { scan } from "react-scan";

export function ReactScan() {
	useEffect(() => {
		scan({
			enabled: true,
			showToolbar: true,
			log: true,
			_debug: "verbose",
			// Enable in prod only if you explicitly want it
			dangerouslyForceRunInProduction: false,
		});
	}, []);

	return <></>;
}
