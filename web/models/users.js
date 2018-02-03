const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String
    },
    photo: {
        type: String
    },
    createAt: {
        type:Date,
        default: Date.now()
    },
    email: {
        type: String
    }
});

const User = mongoose.model('users', UserSchema);
