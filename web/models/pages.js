var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    name:{
        type: String
    },
    createAt: {
        type:Date,
        default: Date.now
    },
    html: {
        type: String
    }
});

var Page = mongoose.model('pages', PageSchema);
