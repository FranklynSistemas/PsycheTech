var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
    password: {
        type: String
    }
});

var User = mongoose.model('user', UserSchema);
