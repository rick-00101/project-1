import { Button } from "../components/ui/button"
import { Field } from "../components/ui/field"
import { Input } from "../components/ui/input"

export function Add() {
  return (
    <div className="flex flex-col justify-center  items-center h-[] mt-10">
        <Field orientation="horizontal" className="w-1/2  ">
      <Input  type="search" placeholder="Add task..." />
        <Button variant="outline">ADD</Button>
    </Field>
    
    <p className="mt-10 text-4xl text-gray-500">
        MY daily task
    </p>
    </div>
    
  )
}
