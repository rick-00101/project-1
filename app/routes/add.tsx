import { Button } from "../components/ui/button"
import { Field } from "../components/ui/field"
import { Input } from "../components/ui/input"
import {CardSmall} from "./workcomp";
import {useState} from "react";

export  function Add() {
  const [value , setValue] = useState("")
  const [visible ,setVisible] = useState(Boolean)


    function destroyer(){
        setVisible(false)
      }
      function creator(){
        setVisible(true)
      }

 
  
  return (
    <>
    <div className="flex flex-col justify-center  items-center h-[] mt-10">
        <Field orientation="horizontal" className="w-1/2  ">
      <Input   value={value} onChange={(e)=>setValue(e.target.value)} type="search" placeholder="Add task..." />
        <Button  onClick={creator}  variant="outline">ADD</Button>
    </Field>
    
    <p className="mt-10 text-4xl text-gray-500">
        MY daily task
    </p>
    </div>
    {
      visible && (
        <CardSmall 
        work={value}
        destroyer={destroyer}/>

      )
    }
    </>
    
    
  )
}
