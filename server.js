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


// Also keep cors() middleware for local/dev
app.use(cors());

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
