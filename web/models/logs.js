const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogsSchema = new Schema({
    eventName:{
        type: String
    },
    createAt: {
        type:Date,
        default: Date.now()
    },
    log: {
        type: String
    }
});

let logs = mongoose.model('logs', LogsSchema)

module.exports = logs