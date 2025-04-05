import File from '../models/File.js';
import cloudinary from '../config/cloudinary.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';


// For __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FileController = {
    storeFile: async (req, res) => {
        console.log(req.body);
        const storage = multer.memoryStorage();
        const upload = multer({ storage });
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        try {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'images' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            const file = new File({
                filename: req.file.originalname,
                filePath: result.secure_url,
                public_id :result.public_id,
            });

            await file.save();
            res.status(201).json({ message: 'File uploaded successfully', file });
        } catch (error) {
            
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    },

    getAllFiles: async (req, res) => {
        try {
            const files = await File.find();
            res.status(200).json(files);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching images', error: error.message });
        }
    },

    deleteFile: async (req, res) => {
        try {
            const { id } = req.params;
            const file = await File.findByIdAndDelete(id);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
            // const filePath = path.join(__dirname, '..', 'uploads', file.filename);

            // if (fs.existsSync(filePath)) {
            //     fs.unlinkSync(filePath);
            // }
            await cloudinary.uploader.destroy(file.public_id);
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting image', error: error.message });
        }
    }
};

export default FileController;
