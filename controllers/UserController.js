const User = require('../models/User');
const mongoose = require('mongoose');

const UserController = {
    async store(req, res) {
        try {
            const { name, email } = req.body;

            if (!name || !email ) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const user = new User({
                name,
                email,
            });
            const savedUser = await user.save();

            res.status(201).json({ message: 'User created successfully.', user: savedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating the user.' });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching users.' });
        }
    }
    // Uncomment and implement the following methods as needed
};

module.exports = UserController;