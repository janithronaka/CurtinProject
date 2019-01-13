var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['MAIL', 'SYSTEM', 'USER', 'OTHER', 'ERROR']
    },
    action: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    },
    user: {
      type: String,
      required: false,
      default: 'ADMIN'
    }
});

mongoose.model('Log', LogSchema);

module.exports = mongoose;
