import express from 'express';
import mongoDBConn from './config/MongoDBConfig.js';
import bodyParser from 'body-parser';
import router from './routers/routers.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// 🛡️ Manual CORS headers (important for Vercel)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://task36-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Also keep cors() middleware for local/dev
app.use(cors({
  origin: "https://task36-frontend.vercel.app",
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

// Optional test route
app.get("/cors-test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

mongoDBConn().then(() => {
  console.log("MongoDB Connected Successfully");
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
