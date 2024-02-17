const formidable = require('formidable');

const fileHandler = require('../../utils/fileHandler');

const Branding = require('../../models/Branding');

module.exports.brandingForm = async (req, res) => {
    try {
        let branding = null;
        if(req.params.id){
            branding = await Branding.findOne({_id:req.params.id});
        }

        return res.render('admin/add-branding', { 
            title: 'Express', 
            baseLink: process.env.BASE_URL,
            branding
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.addBranding = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({multiples: true});
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(200).send({
                    status: false,
                    message: "Invalid Request.",
                    data: []
                })
            }
            const payload = {
                title: fields.title,
                subtitle: fields.subtitle,
                desc: fields.desc, 
                category: fields.category,
                about: fields.about,
            }

            if(files.banner) {
                const result = await fileHandler.mediaHandler(files.banner, 'public/images/branding','image');
                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.banner = result.files[0]
            }
            if(files.attachments) {
                const result = await fileHandler.mediaHandler(files.attachments, 'public/images/branding','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.attachments = result.files
            }

            await Branding.create(payload)

            return res.status(200).json({
                success: true,
                message: "Branding added successfully"
            })
        })   
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.editBranding = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({multiples: true});
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(200).send({
                    status: false,
                    message: "Invalid Request.",
                    data: []
                })
            }
            const payload = {
                title: fields.title,
                subtitle: fields.subtitle,
                desc: fields.desc, 
                category: fields.category,
                about: fields.about,
            }

            if(files.banner) {
                const result = await fileHandler.mediaHandler(files.banner, 'public/images/branding','image');
                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.banner = result.files[0]
            }
            if(files.attachments) {
                const result = await fileHandler.mediaHandler(files.attachments, 'public/images/branding','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.attachments = result.files
            }

            await Branding.updateOne({ _id:fields.id }, payload)

            return res.status(200).json({
                success: true,
                message: "Branding updated successfully"
            })
        })   
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.deleteBranding = async (req, res) => {
    try {
        await Branding.deleteOne({_id: req.params.id});
        return res.redirect('/admin/manage-branding');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

module.exports.listBrandings = async (req, res) => {

    try {
        const brandings = await Branding.find().sort({ updatedAt: -1});

        return res.render('admin/manage-branding', { 
            title: 'Express',
            data: brandings,
            baseLink: process.env.BASE_URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}