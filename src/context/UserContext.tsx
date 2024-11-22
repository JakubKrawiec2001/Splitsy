import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { UserContextType } from "@/types";
import { Loader2 } from "lucide-react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Loading from "@/components/Loading";

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!user) return;
		const fetchUserData = async () => {
			try {
				const userDocRef = doc(db, "users", user.uid);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					const userFirebaseData = userDoc.data();
					setUserData(userFirebaseData);
				} else {
					console.log("No such document!");
					return null;
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [user]);

	if (loading) {
		return <Loading />;
	}

	return (
		<UserContext.Provider value={{ user, loading, userData }}>
			{!loading && children}
		</UserContext.Provider>
	);
};
