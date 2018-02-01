var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
    name:{
        type: String
    },
    createAt: {
        type:Date,
        default: Date.now()
    },
    content: {
        type: String
    },
    shortView: {
        title: {
            type: String
        },
        content: {
            type: String
        }
    },
    bost: {
        type: Number
    },
    qualification: {
        type: Schema.Types.ObjectId,
        ref: 'qualifications'
    }
});

var Articles = mongoose.model('articles', ArticlesSchema);
