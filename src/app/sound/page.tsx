"use client";

import BComponent from "./_b";
import CComponent from "./_c";
import Provider from "./_provider";
import Scanner from "./_scanner";

const SoundPage = () => {
	return (
		<Provider>
			<h1>This is scan qr page</h1>

			<Scanner />
			<BComponent />
			<CComponent />
		</Provider>
	);
};

export default SoundPage;
