const mongoose = require('mongoose');

var backstageSchema = new mongoose.Schema(
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

module.exports = Backstage = mongoose.model('backstage', backstageSchema);