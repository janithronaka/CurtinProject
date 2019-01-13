var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var TaskSchema = new Schema({
    taskId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    projectId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    budget: {
        type: Number,
        required: false,
    },
    completed: {
        type: Boolean,
        require: false
    }

});

mongoose.model('Task', TaskSchema);
autoIncrement.initialize(mongoose.connection);
TaskSchema.plugin(autoIncrement.plugin, { model: 'Task', field: 'taskId', startAt: 500000 });
module.exports = mongoose;