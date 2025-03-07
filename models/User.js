const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }, 
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Standard User', 'Organizer', 'System Admin'], 
        required: true 
    },
}, { timestamps: true }); s

module.exports = mongoose.model('User', userSchema);
