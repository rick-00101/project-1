
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { io , Socket   } from "socket.io-client";

export default function Customroom() {
  interface Task {
    work: string;
    roomId: string;
    todoId: string;
    state: boolean;
  }

  const [value, setValue] = useState("");
  const [task, setTask] = useState<Task[]>([]);
  const [visible, setVisible] = useState(false);
  const {roomId} = useParams();
  const socketRef = useRef< Socket | null > (null);
  
  useEffect(()=>{
    if(!socketRef.current){
      socketRef.current=io("http://localhost:5000" , {
        withCredentials : true
      })
    }

    if(roomId){
      socketRef.current?.emit("Join" , roomId)
      console.log(`Joined room ${roomId}`)
    }

    socketRef.current?.on("recieve" , (data : Task)=>{
      setTask((prev)=> [...prev , data])
    })

    socketRef.current?.on("task-delete" , ({todoId } : {todoId : string})=>{

      // have to render task that are != todoId
      console.log("Delete signal received for:", todoId);
      setTask((prevTask) => prevTask.filter((t) => t.todoId !== todoId));
      

    })

     return () => {
      socketRef.current?.off("recieve");
      socketRef.current?.off("task-delete");
      socketRef.current?.disconnect();
      socketRef.current = null;
    };

  },[roomId])


  function wipeoff(todoId: string) {
    const filteredTask = task.filter((t) => t.todoId != todoId);
    setTask(filteredTask);
    socketRef.current?.emit("task-delete", { roomId, todoId });

    
  }
 

  async function  addTask(value: string) {
    
    const generatedID=crypto.randomUUID()

    const newTask ={
      work : value ,
      roomId: roomId || "",
      
      todoId: generatedID,
      state: false,

    }

  
    
    setTask(prev =>[...prev , newTask])

     await axios.post(
      "http://localhost:5000/api/task/workadd",{

        roomId : roomId,
        todoid : generatedID,
        content : value,


      

    },{
      withCredentials:true
    }
  )

    socketRef.current?.emit("send" , newTask)
    setValue("");
  }

  const isEmpty = value.length === 0;

  return (
    <>
      <div className="relative overflow-hidden h-screen w-screen bg-slate-950 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] ]">
        <div className="position:absolute top-4 left-4 z-10  p-2 rounded">
          <button
            onClick={() => {
              setVisible(!visible);
            }}
            className="rounded  cursor-pointer mr-4 bg-black/5  px-1.5 py-0.5 text-black bg-white "
          >
            {visible ? "CLOSE CANVAS" : "ADD CARD"}
          </button>

          {visible && (
            <div
              style={{ left: "200px", top: "200px" }}
              className="absolute w-56 h-56 bg-pink-200 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] shadow-cyan-500/5 text-slate-900 p-4 shadow-2xl rounded-tl-sm rounded-br-2xl border-l-4 border-yellow-400 flex flex-col justify-between transform hover:scale-105 transition-all cursor-pointer"
            >
              <textarea
                name="tasks"
                defaultValue="enter targets"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="bg-transparent resize-none w-full h-10 border-2 text-sm font-semibold text-slate-800 focus:outline-none"
              />
              <div>
                {task.length > 0 &&
                  task.map((t) => (
                    <div
                      key={t.todoId}
                      className="flex items-center gap-2 text-xs font-medium text-slate-800"
                    >
                      <input
                        type="checkbox"
                        checked={t.state}
                        onClick={() => wipeoff(t.todoId)}
                      />
                      <span
                        className={t.state ? "line-through text-slate-400" : ""}
                      >
                        {t.work}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 border-t border-black/5 pt-2">
                <span className="bg-black/5 px-1.5 py-0.5 rounded">
                  BY PIYUSH
                </span>
                <button
                  className="rounded  cursor-pointer mr-4 bg-black/5  px-1.5 py-0.5"
                  onClick={() => {
                    !isEmpty && addTask(value);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
