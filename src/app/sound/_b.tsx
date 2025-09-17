import { useProvider } from "./_provider";

const BComponent = () => {
	const audioStore = useProvider();

	return (
		<div>
			<button type="button" onClick={() => audioStore.play()}>
				Play
			</button>
		</div>
	);
};

export default BComponent;
