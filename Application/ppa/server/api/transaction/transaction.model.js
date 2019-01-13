var mongoose = require('../../dbConfig');

const TransactionSchema = mongoose.Schema({
  accId: { type: String, required: true },
  amount: { type: Number, required: true},
  desc: { type: String, required: false},
  donation: { type: String, default: 'false' },
  entered: { type: String, default: 'SYSTEM' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
