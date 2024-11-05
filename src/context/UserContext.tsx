import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebase";
import { UserContextType } from "@/types";
import { Loader2 } from "lucide-react";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader2 size={20} className="animate-spin" />;
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
