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

module.exports.getBlogById = async (req, res) => {
    try {
        const blog = await Branding.findById(req.params.id);

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