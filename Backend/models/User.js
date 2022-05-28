const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAnEmployee: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);