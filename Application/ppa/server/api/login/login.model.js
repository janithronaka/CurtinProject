var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    memberID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
      type: String,

  }
});


mongoose.model('login', LoginSchema);


module.exports = mongoose;
