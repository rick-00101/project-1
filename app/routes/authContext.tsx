import { useEffect, useState } from "react";
import { useNavigate , useLocation } from "react-router";
import axios from "axios";
export  default function AuthContext({ children }: { children: React.ReactNode }) {
    
    type user= {
        email : string ; 
        userId  : string
    }
  const [user, setuser] = useState<user>() ;
  const [isLoading, setIsLoading] = useState(true); // ⏳ Loading state zaroori hai
  const Navigate=useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkFunction = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/api/auth/v1/me",
          withCredentials: true,
        });
        if(response.data && response.data.user){
            setuser(response.data.user)
        }
      } catch {
        console.log("not loogin");
      }finally {
        setIsLoading(false); // Check khatam, loading band!
      }
      
    };
    checkFunction()
  }, []);
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading system...</div>;
  }

  // 2. 🛡️ PROTECTION LOGIC (Tala)
  const isLoginPage = location.pathname === "/"; // Maan lete hain tumhara login root '/' par hai

  // Case A: User logged in HAI, par woh firse login page par jaane ki koshish kar raha hai
  if (user && isLoginPage) {
    return Navigate("/app"); // Dhakka maar kar dashboard par bhejo
  }

  // Case B: User logged in NAHI hai, par woh andar ke pages (/app) kholne ki koshish kar raha hai
  if (!user && !isLoginPage) {
    return Navigate("/"); // Dhakka maar kar wapas login screen par feko
  }

  // Case C: Sab sahi hai, rasta saaf hai!
  return <>{children}</>;
  

  
  
}
