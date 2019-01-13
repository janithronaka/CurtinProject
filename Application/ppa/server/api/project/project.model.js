var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

var ProjectSchema = new Schema({
    projectId: {
        type: String,
        required: true,
        index: { unique: true, dropDups: true }
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },

    status: {
        type: String,
        required: false,
        enum: ['Initialized', 'Approved', 'Started', 'Completed', 'Cancelled'],
        default: 'Initialized'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    startingDate: {
        type: Date
    },
    budget: {
        type: Number
    },
    tasks: [{ type : Schema.ObjectId, ref: 'Task' }],
});

mongoose.model('Project', ProjectSchema);

module.exports = mongoose;