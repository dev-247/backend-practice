const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        firstName: {type: String, required: true,},
        lastName: String,
        email: {type: String, required: true, unique: true},
        jobTitle: {type: String},
        gender: {type: String},
    }, {timestamps: true}
)

const User = mongoose.model('User', userSchema)

module.exports = User