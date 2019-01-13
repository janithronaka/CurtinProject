var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    exDate: {
        type: String,
        required: false
    },
    link: {
      type: String,
      required: false
    }
});

mongoose.model('News', NewsSchema);

module.exports = mongoose;
