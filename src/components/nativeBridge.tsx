"use client";

import { useEffect, useMemo, useRef } from "react";

export type NativeMessage = { type: string; [key: string]: unknown };

export function useNativeBridge(onMessageFromNative?: (msg: NativeMessage) => void) {
	const isInWebView = useMemo(() => {
		return typeof window !== "undefined" && Boolean((window as any).__RN_WEBVIEW__);
	}, []);

	const sendToNativeRef = useRef((msg: NativeMessage) => {
		if (typeof window === "undefined") return;
		(window as any).ReactNativeWebView?.postMessage(JSON.stringify(msg));
	});

	useEffect(() => {
		if (!onMessageFromNative) return;
		const handler = (ev: MessageEvent) => {
			onMessageFromNative(ev.data as NativeMessage);
		};
		window.addEventListener("message", handler);
		return () => window.removeEventListener("message", handler);
	}, [onMessageFromNative]);

	return { isInWebView, sendToNative: sendToNativeRef.current } as const;
}
