//7.71
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskrouter from './routes/taskRoutes';
import {Server} from  "socket.io";
import { createServer } from 'node:http';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const httpserver =createServer(app);

const io = new Server(httpserver , {
  cors : {
    origin : process.env.FRONTEND_URL || "http://localhost:5173",
    credentials :true
  }
})


// Middlewares
app.use(cors({
   origin: process.env.FRONTEND_URL || "http://localhost:5173",
   credentials: true, 
})); // Isse Frontend bina CORS error ke baat kar payega
app.use(express.json()); // Isse server JSON data ko samajh payega
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/task', taskrouter)

// Basic Testing Route
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", message: "Backend is running flawlessly!" });
});

io.on('connection' , (socket)=>{
  console.log( " websocket confirmed" , socket.id)


  socket.on("Join" , (roomId)=>{
    socket.join(roomId);
    console.log("room joined  :", roomId)
  });

  socket.on("send",(data)=>{
    socket.to(data.roomId).emit("recieve",data)
  });

  socket.on('delete_task',({roomId , item_id})=>{
    socket.to(roomId).emit("delete-task",{item_id})
  })

  socket.on("disconnect" , ()=>{
    console.log("disconnected")
  })
})

httpserver.listen(PORT, () => {
  console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});