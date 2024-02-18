// const Appointment = require('../../models/Appointment');
// const Blog = require('../../models/Blog');

module.exports.dashboard = async (req, res, next) => {
    const blogCount = 0//await Blog.countDocuments()
    const appointmentCount = 0//await Appointment.countDocuments()
    return res.render('admin/index', { 
        title: 'Express', 
        blogCount: blogCount, 
        appointmentCount: appointmentCount
    });
}