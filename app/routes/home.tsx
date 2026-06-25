import type { Route } from "./+types/home";
import TopBar from "./topbar"
import { Add }from "./add";
import {useState} from 'react';


export default function Home() {
  const [searchQuery , setsearchQuery]=useState('')
  return (
    <>
    <div className="bg-taupe-300 min-h-screen">
      <TopBar searchQuery={searchQuery}  setsearchQuery={setsearchQuery}/>
      <Add  searchQuery={searchQuery} />
      
      
      
    </div>
    </>
    
  );
}
