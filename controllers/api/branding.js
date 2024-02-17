const Branding = require('../../models/Branding');

module.exports.getBrandings = async (req, res) => {
    try {
        const brandings = await Branding.find().select('-desc').sort({ updatedAt: -1});

        return res.render('branding', { 
            title: 'Express media' ,
            data: brandings,
            baseLink: process.env.BASE_URL 
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.getBrandingById = async (req, res) => {
    try {
        const branding = await Branding.findById(req.params.id);

        if(!branding) {
            return res.status(500).json({
                success: false,
                message: "No branding found"
            })
        }
        console.log(branding);
        let firstAttachment = branding.attachments[0];
        branding.attachments.shift();

        return res.render('branding-details', {
            title: 'Express media',
            data: branding,
            firstAttachment,
            baseLink: process.env.BASE_URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};