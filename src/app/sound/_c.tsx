import { useProvider } from "./_provider";

const CComponent = () => {
	const audioStore = useProvider();

	return (
		<div>
			<button type="button" onClick={() => audioStore.pause()}>
				Pause
			</button>
		</div>
	);
};

export default CComponent;
