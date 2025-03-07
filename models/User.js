const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }, // URL of profile picture
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Standard User', 'Organizer', 'System Admin'], 
        required: true 
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('User', userSchema);
