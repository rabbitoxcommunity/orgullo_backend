const Enquiry = require('../../models/Enquiry');

module.exports.viewEquiries = async (req, res) => {
    try {
        let enquiries = await Enquiry.find().sort({ createdAt: -1});
        console.log(enquiries);
        return res.render('admin/enquiries', { 
            title: 'Orgullo | View Enquiries',
            data: enquiries,
            baseLink: process.env.BASE_URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};