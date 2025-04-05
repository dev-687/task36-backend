const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
            trim: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('File', FileSchema);