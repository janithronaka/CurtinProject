var mongoose = require('../../dbConfig');

const GallerySchema = mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  imagePath: { type: String, required: true},
  added: {type: Date, required: true}
});

module.exports = mongoose.model('Gallery', GallerySchema);
