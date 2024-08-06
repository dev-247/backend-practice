const User = require('../models/user.js');
const mongoose = require("mongoose");

async function createUser(req, res) {
    const {firstName, lastName, email, gender, jobTitle} = req.body;
    if (!firstName || !email) {
        return res.status(400).json({error: 'Missing required parameters'});
    }
    if (typeof firstName !== 'string' || firstName.trim() === '') {
        return res.status(400).json({error: 'Invalid name'});
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return res.status(400).json({error: 'Invalid email'});
    }

    // If all validations pass, create the user
    try {
        const user = await User.create({firstName, lastName, email, jobTitle, gender})
        // const user = new User({firstName, lastName, email, jobTitle, gender})
        // await user.save();
        res.status(201).send({user: user, 'message': 'user created successfully'})
    } catch (error) {
        console.log(`error =>${error}`)
        if (error instanceof mongoose.MongooseError) {
            const mongoError = error;
            if (mongoError.code === 11000) {
                res.status(400).json({message: 'Email already exists'});
            } else {
                res.status(500).json({message: 'MongoDB error', error: mongoError});
            }
        } else {
            res.status(400).json({message: 'Error creating user', error});
        }
    }


}


async function getAllUsers(req, res) {
    let allUser = await User.find({});
    res.json(allUser);
}


async function getUserById(req, res) {
    let id = req.params.id;
    let user = await User.findById(id)
    if (!user) {
        res.status(404).send('User not found');
    }
    res.json(user);

}

async function updateUser(req, res) {
    let id = req.params.id;

    const {firstName, lastName, email, gender, jobTitle} = req.body;

    let updateData = {firstName, lastName, email, gender, jobTitle}

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
        if (!updatedUser) {
            res.status(404).send('User not found');
        } else {
            res.status(201).json({'user': updatedUser, "msg": "user updated successfully"});
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send({ error: 'Duplicate key error: ' + err.message });
        } else {
            res.status(400).send({ error: err.message });
        }
    }
}

async function deleteUser(req, res) {
    const id = req.params.id;
    console.log(`delete _id${id}`)
    let user = await User.findByIdAndDelete(id)
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.status(200).json({"msg": "User deleted successfully", "user": user});
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    createUser
}

