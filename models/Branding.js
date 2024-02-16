const mongoose = require('mongoose');

var brandingSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
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

module.exports = Branding = mongoose.model('branding', brandingSchema);