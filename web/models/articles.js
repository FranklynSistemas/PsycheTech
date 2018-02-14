const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
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
        },
        text: {
            type: String
        }
    },
    bost: {
        type: Number
    },
    qualification: {
        type: Schema.Types.ObjectId,
        ref: 'qualifications'
    },
    categorie: {
        type: String
    },
    relations: {
        type: String
    },
    live: {
        type: Boolean,
        default: false
    }
});

let Articles = mongoose.model('articles', ArticlesSchema);


module.exports = Articles