const Media = require('../../models/Media');

module.exports.getMedias = async (req, res) => {
    try {
        const medias = await Media.find().select('-desc').sort({ updatedAt: -1});
        return res.render('media-showcase', { 
            title: 'Express media', 
            data: medias,
            baseLink: process.env.BASE_URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);

        if(!media) {
            return res.status(500).json({
                success: false,
                message: "No media found"
            })
        }

        let firstAttachment = media.attachments[0];
        media.attachments.shift();

        return res.render('media-details', {
            title: 'Express media',
            data: media,
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