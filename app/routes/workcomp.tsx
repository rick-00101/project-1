import { Button } from "../components/ui/button";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

 type Task ={
    work : string ,
    status : "completed" | "pending"
  }

interface cardprop{
  work : Task
  destroyer : (index:number)=>void,
  
  
  index : number,
 
  

}




export function CardSmall( prop : cardprop) {









  
   
  return (
    <>
    {
       (
        <div>
      <Card size="sm" className="mx-auto bg-taupe-400 mt-6 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Task {prop.index + 1}</CardTitle>
        
      </CardHeader>
      <CardContent >
        <p className={prop.work.status=="completed" ? " line-through opacity-50" : ""} >
          { prop.work.work  }
          
          
          
        </p>
      </CardContent>
      <CardFooter>
        <Button   onClick ={()=>prop.destroyer(prop.index)}    variant="outline" size="sm" className="w-full">
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
