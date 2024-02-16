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

module.exports.getBlogById = async (req, res) => {
    try {
        const blog = await Media.findById(req.params.id);

        if(!blog) {
            return res.status(500).json({
                success: false,
                message: "No blog found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: blog
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};