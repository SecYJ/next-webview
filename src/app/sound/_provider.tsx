import { Howl } from "howler";
import { createContext, ReactNode, use, useState } from "react";

const ContextProvider = createContext<Howl | null>(null);

const Provider = ({ children }: { children: ReactNode }) => {
	const [audioStore] = useState(
		() =>
			new Howl({
				src: ["/sound-test.mp3"],
			})
	);

	return <ContextProvider value={audioStore}>{children}</ContextProvider>;
};

export const useProvider = () => {
	const ctx = use(ContextProvider);

	if (!ctx) {
		throw new Error("useProvider must be used within a Provider");
	}

	return ctx;
};

export default Provider;
