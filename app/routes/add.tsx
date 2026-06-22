import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { CardSmall } from "./workcomp";
import { useState  ,useEffect} from "react";


export function Add() {
  type Task ={
    id : string
    work : string ,
    status : "completed" | "pending"
  }
  
  const [value, setValue] = useState("");

  const [task, setTask] = useState<Task[]>([]);

 
 
  
  const isEmpty = value.length === 0;

    function destroyer( index:number) {

      setTask(task.map((task , i)=>
      i=== index ?
    { ...task, status : "completed" } 
  : task))
  console.log(task[index].status);
    


    
  }

  function edittask( editval : string , id : string ){
   setTask(
    task.map(
      (t)=>(t.id == id ) ? {...t  , work: editval }: t
    )
   )

  }


  function deletetask(id : string){

    setTask(task.filter(
      t=> t.id == id ?  t.work="" : t 
      
    ))

  }

 

  useEffect(()=>{
    const tasks = JSON.stringify(task)

    const saved = localStorage.getItem(tasks);

    if(saved){
      setTask(JSON.parse(saved))
    }

  },[task])
  

  function addtask() {
    setTask([...task ,   {
    id : crypto.randomUUID(),
    work: value,
    status: "pending",
  },]);
    setValue("");
    console.log("Task added:", value);
  }

  return (
    <>
      <div className="flex flex-col justify-center  items-center h-[] mt-10">
        <Field orientation="horizontal" className="w-1/2  ">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="search"
            placeholder="Add task..."
          />
          <Button
            onClick={
              isEmpty
                ? undefined
                : () => {
                   ;
                    addtask();
                  }
            }
            variant="outline"
          >
            ADD
          </Button>
        </Field>

        <p className="mt-10 text-4xl text-gray-500">MY daily task</p>
      </div>
      {task.length>0 && (
        <div>
          {task.map((singletask, index: number) => {
            return (
              <div key={index}>
                <CardSmall
                
                  id ={singletask.id}
                  
                  destroyer={destroyer}
                  edittask={edittask}
                  deletetask={deletetask}
                 
                  work={singletask}
                  index ={index}
                  
                  
                  
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
