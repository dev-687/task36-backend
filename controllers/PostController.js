const Post = require('../models/Post');

const PostController = {
   // Create a new post
    createPost: async (req, res) => {
        try {
            const { title, content, author,tags } = req.body;
            const newPost = new Post({ title, content, author, tags }); 
            await newPost.save();
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error: error.message });
        }
    },

    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate("author", "name");;
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error: error.message });
        }
    },

    // Get a single post by ID
    getPostById: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching post', error: error.message });
        }
    },

    // Update a post by ID
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { title, content },
                { new: true }
            );
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
        } catch (error) {
            res.status(500).json({ message: 'Error updating post', error: error.message });
        }
    },

    // Delete a post by ID
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedPost = await Post.findByIdAndDelete(id);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error: error.message });
        }
    },
};

module.exports = PostController;