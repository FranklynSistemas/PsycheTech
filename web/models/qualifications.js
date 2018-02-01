var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QualificationsSchema = new Schema({
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

var Qualifications = mongoose.model('qualifications', QualificationsSchema);
