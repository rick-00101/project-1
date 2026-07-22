"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//7.71
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const httpserver = (0, node_http_1.createServer)(app);
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://moneylonger.vercel.app",
    "https://moneylonger.verce.app",
    "http://localhost:5173"
].filter(Boolean);
const io = new socket_io_1.Server(httpserver, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});
// Middlewares
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
})); // Isse Frontend bina CORS error ke baat kar payega
app.use(express_1.default.json()); // Isse server JSON data ko samajh payega
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/task', taskRoutes_1.default);
// Basic Testing Route
app.get('/api/health', (req, res) => {
    res.json({ status: "healthy", message: "Backend is running flawlessly!" });
});
io.on('connection', (socket) => {
    console.log(" websocket confirmed", socket.id);
    socket.on("Join", (roomId) => {
        socket.join(roomId);
        console.log("room joined  :", roomId);
    });
    socket.on("send", (data) => {
        socket.to(data.roomId).emit("recieve", data);
    });
    socket.on('delete_task', ({ roomId, item_id }) => {
        socket.to(roomId).emit("delete-task", { item_id });
    });
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});
httpserver.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});
