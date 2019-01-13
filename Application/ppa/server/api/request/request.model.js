var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var ReqSchema = new Schema({
    memberID: {
      type: String,
      required: true
    },
    type: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    expected_date: {
        type: String,
        required: true
    },
    progress: {
      type: String,
      required: true
    }
});

mongoose.model('Request', ReqSchema);

module.exports = mongoose;
