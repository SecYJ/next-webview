"use client";

import { useQr } from "./_use-qr";

const ScanQrPage = () => {
	const { startScanner, pauseScanner, resumeScanner, stopScanner, status } = useQr();

	return (
		<div>
			<div className="flex gap-2 items-center">
				<button type="button" onClick={startScanner} disabled={status === "starting"}>
					{status === "paused" ? "Resume" : "Start"}
				</button>
				<button type="button" onClick={pauseScanner} disabled={status !== "scanning"}>
					Pause
				</button>
				<button type="button" onClick={resumeScanner} disabled={status !== "paused"}>
					Resume
				</button>
				<button type="button" onClick={stopScanner} disabled={status === "idle"}>
					Stop
				</button>
				<span className="text-sm opacity-70">state: {status}</span>
			</div>

			<div id="container" className="size-60" />
		</div>
	);
};

export default ScanQrPage;
