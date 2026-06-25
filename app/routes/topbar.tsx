import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {useState, type SetStateAction} from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../components/ui/input-group";
import {Link} from "react-router"
type topprop =  {
  searchQuery : string,
  setsearchQuery : React.Dispatch<SetStateAction<string>>
}
export default function Topbar( 

  prop : topprop
  
) {
  return (
    <>
      <div className="flex w-full h-15 justify-end items-center p-2 ">
        <div className="mr-auto">
          <Link to="/" aria-label="Home">
        <svg viewBox="0 0 100 100" className="h-8 w-8 fill-primary">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </Link>
        </div>
        <div className="mr-8">
          <InputGroup className="w-[300px]">
            <InputGroupInput  value={prop.searchQuery} onChange={(e)=>{prop.setsearchQuery(e.target.value)}} placeholder="Search..." />
            <InputGroupAddon></InputGroupAddon>
          </InputGroup>
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="ml-2">CASHMONEYRICK</p>
      </div>
    </>
  );
}
