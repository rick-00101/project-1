import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { CardSmall } from "./workcomp";
import { useState } from "react";

export function Add() {
  type Task ={
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
  

 
  

  function addtask() {
    setTask([...task ,   {
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
          {task.map((task, index: number) => {
            return (
              <div key={index}>
                <CardSmall
                  
                  destroyer={destroyer}
                 
                  work={task}
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
