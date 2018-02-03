const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    name:{
        type: String
    },
    createAt: {
        type:Date,
        default: Date.now()
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
});

const contacts = mongoose.model('contacts', ContactsSchema);
