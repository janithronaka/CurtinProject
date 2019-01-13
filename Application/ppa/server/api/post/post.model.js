var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var PostSchema = new Schema({
    postId: {
        type: Number,
        required: true
    },
    parentPostId: {
        type: Number,
        required: false
    },
    projectId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        userId: {
            type: String,
        },
        name: {
            type: String
        },
        email: {
            type: String
        }
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    comments: [{ type : Schema.ObjectId, ref: 'Post' }],
    attachments: [{
        fileName: {
            type: String
        },
        fileType: {
            type: String
        },
        fileUrl: {
            type: String
        },
        fileLocation: {
            type: String
        },
    }]

});

mongoose.model('Post', PostSchema);
autoIncrement.initialize(mongoose.connection);
PostSchema.plugin(autoIncrement.plugin, { model: 'Post', field: 'postId', startAt: 100000 });
module.exports = mongoose;