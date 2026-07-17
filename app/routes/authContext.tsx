import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router"; // 👈 Navigate component bhi le aaya redirection ke liye
import axios from "axios";

// 📝 1. Type ko upar rakh diya clearity ke liye
type UserType = {
  email: string;
  userId: string;
};

// 🎯 2. GLOBAL SCOPE: Context ko function se BAAHAR nikal diya!
// Ab ise useAuth aur AuthContext dono aaram se dekh sakte hain.
const UserContext = createContext<{
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
} | null>(null);


export default function AuthContext({ children }: { children: React.ReactNode }) {
  // State ka naam setUser (Capital U) kar diya taaki context match kare
  const [user, setUser] = useState<UserType | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    const checkFunction = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/auth/v1/me`,
          withCredentials: true,
        });
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch {
        console.log("not logged in");
      } finally {
        setIsLoading(false); 
      }
    };
    checkFunction();
  }, []);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading system...</div>;
  }

  // 🛡️ PROTECTION LOGIC (Tala)
  const isLoginPage = location.pathname === "/"; 

  // 🚨 RE-RENDER TRAP SE BACHNE KE LIYE: Yahan component <Navigate /> return karenge, function wala Navigate nahi!
  if (user && isLoginPage) { 
    return <Navigate to="/app" replace />; 
  }

  if (!user && !isLoginPage) {
    return <Navigate to="/" replace />; 
  }

  // Case C: Sab sahi hai, Provider me values pass karke children render karo
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 👑 3. Ab yeh hook bina kisi error ke chalega kyunki UserContext ab iske scope me hai!
export function useAuth() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}