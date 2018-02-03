const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QualificationsSchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now()
  },
  comments: [{
    userName: {
      type: String,
    },
    comment: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
  }],
  likes: {
    type: Number,
    default: 0
  }
});

const Qualifications = mongoose.model('qualifications', QualificationsSchema);
