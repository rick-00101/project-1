import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {  type SetStateAction } from 'react';
import { useNavigate} from "react-router"; // 👈 useNavigate sahi hook le aaya
import axios from "axios";
import { useAuth } from "./authContext";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { Link } from "react-router";

type Topprop = {
  searchQuery: string;
  setsearchQuery: React.Dispatch<SetStateAction<string>>;
};

export default function Topbar(prop: Topprop) {
  // 🎯 STEP 1: Saare hooks ko component ke andar bitha diya (Rule Fixed!)
  const navigate = useNavigate(); 
  
  const { user, setUser } = useAuth(); // User ka data bhi nikal liya taaki dynamic name dikhe

  // 🎯 STEP 2: Logout function ko bhi component ke andar le aaye
  const handleLogout = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/auth/v1/google/logout`, // 👈 URL sahi router wala kar diya
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(null); // Live memory clean
        navigate("/", { replace: true }); // 🚀 Boom! Dhakka maar kar login page par!
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="flex w-full h-15 justify-end items-center ">
        <div className="mr-auto">
          <Link to="/app" aria-label="Home">
            <svg viewBox="0 0 100 100" className="h-8 w-8 ml-4">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </Link>
        </div>
        
        <div className="mr-8">
          <InputGroup className="w-[300px]">
            <InputGroupInput
              value={prop.searchQuery}
              onChange={(e) => {
                prop.setsearchQuery(e.target.value);
              }}
              placeholder="Search..."
            />
          </InputGroup>
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        
        {/* 🔥 DYNAMIC USER EMAIL: Ab sarkaari hardcoded naam ke bajaye asli logged-in user dikhega */}
        <p className="ml-2 text-sm text-black  font-medium">
          {user?.email || "GUEST"}
        </p> 

        {/* 🎯 STEP 3: Brackets () ke sath function properly execute kar diya */}
        <button 
          className="ml-8 mr-8  p-1/2 focus:outline-2 hover:bg-taupe-400 rounded rounded-4"
          onClick={handleLogout} 
        >
          Logout
        </button>
      </div>
    </>
  );
}