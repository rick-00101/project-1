import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";



export default function CjRoom() {
  const [roomId , setroomId] = useState("");
  const navigate = useNavigate();
  const handleCreate =()=>{
    const rId = crypto.randomUUID().slice(0,8).trim();
    setroomId(rId);
    navigate(`/custom/roomId:${rId}`)


  }

  const featureName = "WELCOME TO NEXT LEVEL"

  return (
    <div className="flex items-center h-screen
    ">
    <Card size="sm" className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>{featureName}</CardTitle>
        <CardDescription>
          Compete and Valor 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input className="w-full rounded outline-2" 
        type="text"
        onChange={(e)=>setroomId(e.target.value)}
        value={roomId}
        />
        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" size="sm" className="w-full">
          JOIN
        </Button>
        <Button  size="sm" className="w-full"
        onClick={handleCreate}>
          CREATE NEW
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
