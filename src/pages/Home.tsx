import { auth, db } from "@/config/firebase";
import { useUser } from "@/hooks/useUser";
import { signOut } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) throw new Error("User not authenticated");

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center bg-blue-500 size-full">
      <div className="size-full">
        Splitsy Main Dashboard: {user?.email}{" "}
        <img src={userData?.avatar} alt="" className="size-[100px]" />
        <button className="bg-customCyan p-4" onClick={() => handleLogout()}>
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default Home;
