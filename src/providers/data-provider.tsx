"use client";

import { firestore } from "@/lib/firebase.client";
import { CollectionReference, DocumentData, FirestoreError, collection, onSnapshot } from "firebase/firestore";
import { createContext, use, useEffect, useMemo, useState, type ReactNode } from "react";

type FirestoreDocument = {
	id: string;
	[key: string]: unknown;
};

type DataContextValue = {
	data: FirestoreDocument[];
	loading: boolean;
	error: string | null;
};

const DataContext = createContext<DataContextValue | null>(null);

export const useData = () => {
	const context = use(DataContext);

	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}

	return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
	const [data, setData] = useState<FirestoreDocument[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let unsubscribe = () => {};

		try {
			const db = firestore();
			const ref: CollectionReference<DocumentData> = collection(db, "users");

			unsubscribe = onSnapshot(
				ref,
				(snapshot) => {
					setLoading(false);
					setData(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					);
				},
				(err: FirestoreError) => {
					console.error("Failed to subscribe to Firestore collection", err);
					setLoading(false);
					setError(
						err.code === "permission-denied"
							? "Missing or insufficient permissions. Update Firestore security rules or authenticate to access this data."
							: err.message
					);
				}
			);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error";
			const permissionMessage =
				typeof err === "object" &&
				err !== null &&
				"code" in err &&
				(err as { code: string }).code === "permission-denied"
					? "Missing or insufficient permissions. Update Firestore security rules or authenticate to access this data."
					: errorMessage;
			console.error("Unable to initialise Firestore listener", err);
			setLoading(false);
			setError(permissionMessage);
		}

		return () => {
			unsubscribe();
		};
	}, []);

	// useEffect(() => {
	// 	const db = firestore();

	// 	const getAllUsers = async () => {
	// 		const userCol = collection(db, "users");
	// 		const userSnapshot = await getDocs(userCol);

	// 		// console.log("userSnapshot", userSnapshot);

	// 		userSnapshot.forEach((doc) => {
	// 			// doc.id is the document ID

	// 			// doc.data() is an object containing all fields in the document

	// 			// console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
	// 			console.log("doc.data()", doc.data());
	// 		});
	// 	};

	// 	getAllUsers();
	// }, []);

	const value = useMemo(
		() => ({
			data,
			loading,
			error,
		}),
		[data, error, loading]
	);

	return <DataContext value={value}>{children}</DataContext>;
};

export default DataProvider;
