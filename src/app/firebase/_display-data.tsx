import { useData } from "@/providers/data-provider";

const DisplayData = () => {
	const { data, loading, error } = useData();

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{data.map((item) => {
				return <p key={item.firestoreId}>{item.username || "(missing username)"}</p>;
			})}
		</div>
	);
};

export default DisplayData;
