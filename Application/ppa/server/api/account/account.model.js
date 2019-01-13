var mongoose = require('../../dbConfig');

const AccountSchema = mongoose.Schema({
  accId: { type: String, required: true, unique: true, index: { unique: true } },
  desc: { type: String, required: true},
  status: {type: String, required: true}
});

module.exports = mongoose.model('Account', AccountSchema);
