import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { CardSmall } from "./workcomp";
import { useState  ,useEffect} from "react";

type addprop = {
  searchQuery : string
}
export function Add( prop : addprop ) {
  type Task ={
    id : string
    work : string ,
    status : "completed" | "pending"
  }
  
  const [value, setValue] = useState("");

  const [task, setTask] = useState<Task[]>([]);
  
  

 
 
  
  const isEmpty = value.length === 0;

  const filterredTask =task.filter(
    (t)=> t.work.toLowerCase().includes(prop.searchQuery.toLowerCase()))
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

 

 


  function addtask() {



    setTask([...task ,   {
    id : crypto.randomUUID(),
    work: value,
    status: "pending",
  },]);
    setValue("");
    console.log("Task added:", value);
  }

  useEffect(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) setTask(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(task));
}, [task]);

  return (
    <>
      <div className="flex flex-col justify-center  items-center h-[] mt-10">
        <Field orientation="horizontal" className="w-1/2  ">
          <Input
          className=""
            value={value}
            onChange={(e) => setValue(e.target.value) }
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
      {filterredTask.length>0 ? (
        <div>
          {filterredTask.map((singletask, index: number) => {
            return (
              <div key={singletask.id}>
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
      ) : 
      (
        prop.searchQuery && (
          <p className="text-center text-gray-400 text-sm mt-10">
            No tasks match "{prop.searchQuery}" 🔍
          </p>)
      )}
    </>
  );
}
