import { useData } from "@/providers/data-provider";
import { useReducer } from "react";

const Count = () => {
	const [count, onCountChange] = useReducer((c) => c + 1, 0);

	const { data, loading, error } = useData();

	return (
		<div>
			<button onClick={onCountChange}>Increment</button>
			<p>Count: {count}</p>
			{loading && <p>Loading Firestore data…</p>}
			{error && !loading && <p className="text-red-500">Error: {error}</p>}
			{!loading && !error && (
				<ul className="mt-2 space-y-1 text-sm">
					{data.map(({ id, ...fields }) => (
						<li key={id}>
							<span className="font-semibold">{id}:</span> {JSON.stringify(fields)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Count;
