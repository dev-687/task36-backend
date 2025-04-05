import express from 'express';
import mongoDBConn from './config/MongoDBConfig.js';
import bodyParser from 'body-parser';
import router from './routers/routers.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: "https://task36-frontend.vercel.app",
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options('*', cors()); // Preflight support

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://task36-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// app.use(express.static('uploads')); for local file storage


app.use('/api/v1', router);
app.get("/cors-test", (req, res) => {
  res.json({ message: "CORS is working!" });
});
// Connect to MongoDB before starting the server
mongoDBConn().then(() => {
  console.log("MongoDB Connected Successfully");
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;