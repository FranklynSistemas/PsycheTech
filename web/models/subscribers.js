const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
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
    active: {
        type: Boolean,
        default: true
    }
});

let Subscriber = mongoose.model('subscribers', SubscriberSchema);

module.exports = Subscriber
