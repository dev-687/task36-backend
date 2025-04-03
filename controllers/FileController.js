const File = require('../models/File'); 
const FileController = {
   // Store File
    storeFile: async (req, res) => {
        if(!req.file){
            return res.status(400).json({ message: 'No file uploaded' });
        }
        try {
            const file = new File({ 
                filename:req.file.filename, 
                filePath: `/uploads/${req.file.filename}` 
            }); 
            await file.save();
            res.status(201).json({ message: 'File uploaded successfully', file });
        } catch (error) {
            const filePath=path.join(__dirname, '../uploads', req.file.filename);
            fs.unlinkSync(filePath,(error)=>{
                if (error) {
                    console.error('Error deleting file:', error);
                } else {
                    console.log('File deleted successfully');
                }
            });
            res.status(500).json({ message: 'Error uploading file', error: error.message });    
            
        }
    },

    // Get all Files
    getAllFiles: async (req, res) => {
        try {
            const files = await File.find();
            res.status(200).json(files);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching images', error: error.message });
        }
    },

    // Delete File
    deleteFile: async (req, res) => {
        try {
            const { id } = req.params;
            const file = await File.findByIdAndDelete(id);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting image', error: error.message });
        }
    }

};

module.exports = FileController;