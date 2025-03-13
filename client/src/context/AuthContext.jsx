import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    // Monitor Auth State Changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        localStorage.setItem("user", JSON.stringify(firebaseUser)); // Save user in storage
      } else {
        setUser(null);
        localStorage.removeItem("user"); // Remove user on logout
      }
      setLoading(false);
    });

    // // Auto Logout on Browser Close (Commented Out)
    // const handleUnload = () => {
    //   signOut(auth).catch((error) =>
    //     console.error("Auto logout error:", error)
    //   );
    // };
    // window.addEventListener("beforeunload", handleUnload);

    return () => {
      unsubscribe();
      // window.removeEventListener("beforeunload", handleUnload);
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
