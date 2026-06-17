import { Button } from "../components/ui/button";
import {useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

interface cardprop{
  work : string
  destroyer : ()=> void
}




export function CardSmall( prop : cardprop) {

  const [visible ,setVisible] = useState(true)


  
   
  return (
    <>
    {
      visible && (
        <div>
      <Card size="sm" className="mx-auto bg-taupe-400 mt-6 w-full max-w-sm">
      <CardHeader>
       
        
      </CardHeader>
      <CardContent>
        <p>
          { prop.work}
          
        </p>
      </CardContent>
      <CardFooter>
        <Button   onClick ={prop.destroyer}   variant="outline" size="sm" className="w-full">
          Done
        </Button>
      </CardFooter>
    </Card>
    </div>
      )
      
    }
   
    </>
   
    
  )
}
