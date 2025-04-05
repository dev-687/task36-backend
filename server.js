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
  res.header("Access-Control-Allow-Origin", "https://task36-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// app.use(express.static('uploads')); for local file storage

app.use('/api/v1', router);

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