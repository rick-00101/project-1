import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { io, Socket } from "socket.io-client";

// 🟢 Strictly aligned with your Prisma schema
interface Task {
  item_id: string;      // Schema: item_id
  roomId: string;       // Schema: roomId
  user_id: string;      // Schema: user_id
  content: string;      // Schema: content (Task text)
  status: string;       // Schema: status ("pending" | "completed")
  title: string;        // Schema: title
  type: string;         // Schema: type
}

export default function Customroom() {
  const [value, setValue] = useState("");
  const [task, setTask] = useState<Task[]>([]);
  const [visible, setVisible] = useState(true);
  const { roomId } = useParams<{ roomId: string }>();
  const socketRef = useRef<Socket | null>(null);

  
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        withCredentials: true
      });
    }

    if (roomId) {
      socketRef.current.emit("Join", roomId);
      console.log(`Joined room ${roomId}`);

      
    }

    // 🟢 Standardized Listeners
    socketRef.current.on("recieve", (data: Task) => {
      setTask((prev) => [...prev, data]);
    });

    socketRef.current.on("delete-task", ({ item_id }: { item_id: string }) => {
      console.log("Delete signal received for:", item_id);
      setTask((prevTask) => prevTask.filter((t) => t.item_id !== item_id));
    });

    

    // Clean up connections
    return () => {
      socketRef.current?.off("recieve");
      socketRef.current?.off("delete-task");
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

 

    useEffect(() => {
    if (!roomId) return;

    async function hydrateRoomTasks() {
      try {
        console.log(`🔄 Hydrating tasks from DB for room: ${roomId}`);
        const response = await axios.get(
          `http://localhost:5000/api/task/presist/${roomId}`,
          { withCredentials: true }
        );

        console.log("yaha")
        
        if (response.data) {
        // Agar backend me 'success: true' nahi hai, toh direct data target karo
        const tasksData = response.data.success ? response.data.data : response.data.data;
        
        setTask(tasksData || []);
        console.log("✅ Room items state hydro-sync completed.");
      }
      } catch (error) {
        console.error("❌ Failed to pull existing database state on reload:", error);
      }
    }

    hydrateRoomTasks();

  },[roomId])



  // 🗑️ Handle Deletion (Local UI, Sockets & Database)
  async function wipeoff(itemId: string) {
    // 1. Local State Cleanup
    setTask((prev) => prev.filter((t) => t.item_id !== itemId));

    // 2. Broadcast socket event to room members
    socketRef.current?.emit("delete_task", { roomId, item_id: itemId });

    // 3. Database Sync Call
    try {
      await axios.post(
        "http://localhost:5000/api/task/workdelete",
        { item_id: itemId ,
          roomId : roomId,
          content : value
        },
        { withCredentials: true }
      );
      console.log("Deleted from Database successfully");
    } catch (error) {
      console.error("DB deletion failed:", error);
    }
  }
 
 
  async function addTask(value: string) {
    const generatedID = crypto.randomUUID();

    const newTask: Task = {
      item_id: generatedID,
      roomId: roomId || "",
      user_id: "", // Will be assigned by backend middleware anyway
      content: value,
      status: "pending",
      title: "Canvas Task",
      type: "todo"
    };
    
    // Optimistic state update
    setTask((prev) => [...prev, newTask]);

    try {
      await axios.post(
        "http://localhost:5000/api/task/workadd",
        {
          roomId: roomId,
          todoid: generatedID, // Matches backend req.body mapping
          content: value,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to sync task to database", err);
    }

    // Broadcast creation
    socketRef.current?.emit("send", newTask);
    setValue("");
  }

  const isEmpty = value.length === 0;

  return (
    <>
      <div className="relative overflow-hidden h-screen w-screen bg-slate-950 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute top-4 left-4 z-10 p-2 rounded">
          <button
            onClick={() => setVisible(!visible)}
            className="rounded cursor-pointer mr-4 bg-white px-3 py-1 text-black font-semibold shadow-md"
          >
            {visible ? "CLOSE CANVAS" : "ADD CARD"}
          </button>

          {visible && (
            <div
              style={{ left: "200px", top: "200px" }}
              className="absolute w-56 h-56 bg-pink-200 border-white/10 shadow-2xl text-slate-900 p-4 rounded-tl-sm rounded-br-2xl border-l-4 border-yellow-400 flex flex-col justify-between transform hover:scale-105 transition-all cursor-pointer"
            >
              <textarea
                placeholder="Enter targets..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="bg-transparent resize-none w-full h-10 border-2 text-sm font-semibold text-slate-800 focus:outline-none"
              />
              <div className="overflow-y-auto h-24">
                {task.length > 0 &&
                  task.map((t) => (
                    <div
                      key={t.item_id}
                      className="flex items-center gap-2 text-xs font-medium text-slate-800 my-1"
                    >
                      <input
                        type="checkbox"
                        onClick={() =>{ wipeoff(t.item_id) }}
                        className="cursor-pointer"
                      />
                      <span>{t.content}</span>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 border-t border-black/5 pt-2">
                <span className="bg-black/5 px-1.5 py-0.5 rounded">
                  BY PIYUSH
                </span>
                <button
                  className="rounded cursor-pointer mr-4 bg-black/5 px-1.5 py-0.5"
                  onClick={() => {
                    if (!isEmpty) addTask(value);
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