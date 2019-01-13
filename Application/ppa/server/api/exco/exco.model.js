var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var ExcoSchema = new Schema({
  date_from: {
    type: String,
    required: true
  },
  date_to: {
    type: String,
    required: true
  },
  memberID: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  memberName: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  }
});

mongoose.model('exco', ExcoSchema);
module.exports = mongoose;
