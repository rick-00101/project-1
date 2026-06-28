import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Isse Frontend bina CORS error ke baat kar payega
app.use(express.json()); // Isse server JSON data ko samajh payega

// Basic Testing Route
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", message: "Backend is running flawlessly!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});