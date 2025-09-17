import { Html5Qrcode } from "html5-qrcode";
import { useCallback, useRef } from "react";

export const useQr = () => {
	const scanner = useRef<Html5Qrcode>(null);

	const startScanner = useCallback(async () => {
		if (scanner.current) return;

		scanner.current = new Html5Qrcode("container");

		// let  cameraId = null

		const cameras = await Html5Qrcode.getCameras();

		scanner.current.start(
			cameras[0].id,
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
	}, []);

	const stopScanner = useCallback(async () => {
		if (!scanner.current) return;

		console.log("stop scanner");

		await scanner.current.stop();
		scanner.current.clear();
		scanner.current = null;
	}, []);

	return { startScanner, stopScanner, scanner };
};
