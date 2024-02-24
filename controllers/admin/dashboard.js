const Media = require('../../models/Media');
const Backstage = require('../../models/Backstage');
const Branding = require('../../models/Branding');
const Enquiry = require('../../models/Enquiry');

module.exports.dashboard = async (req, res, next) => {
    const blogCount = 0//await Blog.countDocuments()
    const appointmentCount = 0//await Appointment.countDocuments()
    return res.render('admin/index', { 
        title: 'Express', 
        mediaCount: await Media.countDocuments(),
        backstageCount: await Backstage.countDocuments(),
        brandingCount: await Branding.countDocuments(), 
        enquiryCount: await Enquiry.countDocuments()
    });
}