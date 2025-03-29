const express = require('express');
const postController = require('../controllers/PostController');
const userController = require('../controllers/UserController');

const router = express.Router();

// Middleware to log method name and timestamp
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});



// Post routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);


router.delete('/posts/:id', postController.deletePost);

// User routes
router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);
router.post('/users', userController.store);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

module.exports = router;