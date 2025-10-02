import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const requireEnv = (value: string | undefined, key: string) => {
	if (!value) {
		throw new Error(`Missing Firebase configuration value for ${key}`);
	}
	return value;
};

const buildFirebaseConfig = () => ({
	apiKey: requireEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "NEXT_PUBLIC_FIREBASE_API_KEY"),
	authDomain: requireEnv(
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		"NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
	),
	projectId: requireEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, "NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
	storageBucket: requireEnv(
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		"NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
	),
	messagingSenderId: requireEnv(
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		"NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
	),
	appId: requireEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, "NEXT_PUBLIC_FIREBASE_APP_ID"),
});

let appInstance: FirebaseApp | undefined;

const firebaseApp = () => {
	if (!appInstance) {
		appInstance = initializeApp(buildFirebaseConfig());
	}

	return appInstance;
};

export const firestore = () => getFirestore(firebaseApp());

const messagingReady = async () => {
	if (!(await isSupported())) {
		return undefined;
	}

	return getMessaging(firebaseApp());
};

export { firebaseApp, messagingReady };
