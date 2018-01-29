var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactsSchema = new Schema({
    name:{
        type: String
    },
    createAt: {
        type:Date,
        default: Date.now
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
});

var contacts = mongoose.model('contacts', ContactsSchema);
