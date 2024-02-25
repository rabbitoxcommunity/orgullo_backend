const Backstage = require('../../models/Backstage');

module.exports.getBackstage = async (req, res) => {
    try {
        const backstages = await Backstage.find().select('-desc').sort({ updatedAt: -1});

        return res.render('backstage', { 
            title: 'Express media', 
            data: backstages, 
            baseLink: process.env.BASE_URL ,
            home: false
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.getBackstageById = async (req, res) => {
    try {
        const backstage = await Backstage.findById(req.params.id);

        if(!backstage) {
            return res.status(500).json({
                success: false,
                message: "No backstage found"
            })
        }
        let firstAttachment = backstage.attachments[0];
        backstage.attachments.shift();

        return res.render('backstage-details', {
            title: 'Express media',
            data: backstage,
            firstAttachment,
            baseLink: process.env.BASE_URL,
            home: false
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};