import express from 'express';
import FileController from '../controllers/FileController.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // or diskStorage if saving locally
const upload = multer({ storage });
const router = express.Router();

// Middleware to log method name and timestamp
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// File Uploading routes
router.post('/uploads', upload.single('file'), FileController.storeFile);

router.get('/uploads', FileController.getAllFiles);
router.delete('/uploads/:id', FileController.deleteFile);

export default router; // ✅ Use export in ESM
