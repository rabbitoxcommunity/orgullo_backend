const mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema(
  {
    title: String,
    about: String,
    desc: String,
    banner: String,
    attachments: [String]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = Media = mongoose.model('media', mediaSchema);