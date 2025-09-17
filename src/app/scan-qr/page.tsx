"use client";

import { useQr } from "./_use-qr";

const ScanQrPage = () => {
	const { startScanner, stopScanner, scanner } = useQr();

	return (
		<div>
			<div className="flex gap-2">
				<button type="button" onClick={startScanner}>
					start scan
				</button>
				<button type="button" onClick={stopScanner}>
					stop scan
				</button>
				<button type="button" onClick={() => console.log("scanner instance", scanner)}>
					scanner instance
				</button>
			</div>

			<div id="container" className="size-60" />
		</div>
	);
};

export default ScanQrPage;
