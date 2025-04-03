const express = require('express');
const fileController = require('../controllers/FileController');
const multer = require('multer');
const router = express.Router();

// Middleware to log method name and timestamp
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });
// File Uploading routes
router.post('/uploads',upload.single("file"), fileController.storeFile);
router.get('/uploads', fileController.getAllFiles);
roter.delete('/uploads/:id', fileController.deleteFile);


module.exports = router;