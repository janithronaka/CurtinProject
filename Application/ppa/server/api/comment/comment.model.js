var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: true
    },
    memberId: {
      type: String,
      required: true
  },
  adminOnly: {
    type: String,
    required: false,
    enum: ['1', '0'],
    default: '0'
  },
  category: {
    type: String,
    required: false,
    enum: ['general', 'project'],
    default: 'general'
  },
  projectId: {
    type: String,
    required: false
  },
  subProjectId: {
    type: String,
    required: false
  },
  read: {
    type: String,
    required: false,
    enum: ['1', '0'],
    default: '0'
  }
});

mongoose.model('Comment', CommentSchema);

module.exports = mongoose;
