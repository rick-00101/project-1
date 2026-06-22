import type { SetStateAction  } from "react";
import { Button } from "../components/ui/button";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Previous } from "@hugeicons/core-free-icons";

type Task = {
  id : string
  work: string;
  status: "completed" | "pending";
};

interface cardprop {
  work: Task;
  destroyer: (index: number) => void;
  edittask : ( editval  : string , id : string)=>void,
  deletetask : (id : string)=>void,
  id : string
 

  index: number;
}

export function CardSmall(prop: cardprop) {
   const [edit , setedit] = useState(false)
   const [editval , seteditval ] = useState("")
  return (
    <>
      {
        <div>
          <Card size="sm" className="mx-auto bg-taupe-400 mt-6 w-full max-w-sm">
            <CardHeader>
              <CardTitle>Task {prop.index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              {edit == true ? (
                
                 <>
                  <div className="flex items-center gap-3 w-full max-w-md">
                    <input
                      type="text"
                      onChange={(e)=>seteditval(e.target.value)}
                      value={editval}
                      
                      
                      autoFocus
                      className="w-full px-4  text-base rounded-lg border-2 
               bg-stone-50 
               
               "
                    />
                    <button  onClick={()=>{prop.edittask(editval , prop.id) ; setedit(!edit)}} className=" bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors">
                      Save
                    </button>
                  </div>
                </>
                
              ) : (

                <p
                  className={
                    prop.work.status == "completed"
                      ? " line-through opacity-50"
                      : ""
                  }
                >
                  {prop.work.work}
                  
                </p>
               
                
                
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => prop.destroyer(prop.index)}
                variant="outline"
                size="sm"
                className="w-1/3"
              >
                Done
              </Button>
              <Button
                onClick={() => setedit(!edit)}
                variant="outline"
                size="sm"
                className="w-1/3"
              >
                Edit
              </Button>
              <Button
                onClick={() => prop.deletetask(prop.id)}
                variant="outline"
                size="sm"
                className="w-1/3"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      }
    </>
  );
}
