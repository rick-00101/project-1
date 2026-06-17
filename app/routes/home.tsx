import type { Route } from "./+types/home";
import TopBar from "./topbar"
import { Add }from "./add";
import { CardSmall } from "./workcomp"


export default function Home() {
  return (
    <>
    <div className="bg-taupe-300 min-h-screen">
      <TopBar />
      <Add />
      
      
      
    </div>
    </>
    
  );
}
