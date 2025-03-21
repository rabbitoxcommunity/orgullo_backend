const mongoose = require('mongoose');

var backstageSchema = new mongoose.Schema(
  {
    title: String,
    // about: String,
    // desc: String,
    // banner: String,
    // attachments: [String],
    // videos: [{
    //   url: String,
    //   thumbnail: String
    // }],
    url: String,
    thumbnail: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = Backstage = mongoose.model('backstage', backstageSchema);