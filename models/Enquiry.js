const mongoose = require('mongoose');

var enquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    option: String,
    message: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = Enquiry = mongoose.model('enquiry', enquirySchema);