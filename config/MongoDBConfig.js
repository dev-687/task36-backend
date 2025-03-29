const mongoose = require('mongoose');

const uri = "mongodb+srv://devsoft687:dev_ABC@cluster1.lfl6u.mongodb.net/postDB?retryWrites=true&w=majority&appName=Cluster1";

const mongoDBConn = async () => {
  try {
    await mongoose.connect(uri, {
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = mongoDBConn;
