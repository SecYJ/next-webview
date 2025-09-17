import { Html5Qrcode } from "html5-qrcode";
import { useCallback, useEffect, useRef, useState } from "react";

export const useQr = () => {
	const scanner = useRef<Html5Qrcode | null>(null);
	const [status, setStatus] = useState<"idle" | "starting" | "scanning" | "paused" | "stopping">("idle");

	const startScanner = useCallback(async () => {
		if (scanner.current && status === "paused") {
			// If we previously paused, prefer resuming instead of re-requesting camera permissions
			await scanner.current.resume();
			setStatus("scanning");
			return;
		}

		if (scanner.current) return; // already scanning

		setStatus("starting");
		scanner.current = new Html5Qrcode("container");

		try {
			const cameras = await Html5Qrcode.getCameras();
			if (!cameras || cameras.length === 0) throw new Error("No cameras found");
			// Prefer back camera when available
			const preferred = cameras.find((c) => c.label?.toLowerCase().includes("back"))?.id ?? cameras[0].id;

			await scanner.current.start(
				preferred,
				{
					fps: 10,
					qrbox: 250,
				},
				(decodedText, decodedResult) => {
					console.log(decodedText, decodedResult);
				},
				(error) => {
					console.log(error);
				}
			);
			setStatus("scanning");
		} catch (err) {
			console.error("Failed to start scanner", err);
			// Clean up if start fails
			try {
				await scanner.current?.stop();
				await scanner.current?.clear();
			} catch {}
			scanner.current = null;
			setStatus("idle");
		}
	}, [status]);

	const pauseScanner = useCallback(async () => {
		if (!scanner.current || status !== "scanning") return;
		await scanner.current.pause(true);
		setStatus("paused");
	}, [status]);

	const resumeScanner = useCallback(async () => {
		if (!scanner.current || status !== "paused") return;
		await scanner.current.resume();
		setStatus("scanning");
	}, [status]);

	const stopScanner = useCallback(async () => {
		if (!scanner.current) return;
		setStatus("stopping");
		try {
			await scanner.current.stop();
			await scanner.current.clear();
		} finally {
			scanner.current = null;
			setStatus("idle");
		}
	}, []);

	useEffect(() => {
		return () => {
			// Release camera on unmount
			if (scanner.current) {
				scanner.current
					.stop()
					.then(() => scanner.current?.clear())
					.catch(() => void 0)
					.finally(() => {
						scanner.current = null;
						setStatus("idle");
					});
			}
		};
	}, []);

	return { startScanner, pauseScanner, resumeScanner, stopScanner, scanner, status } as const;
};
