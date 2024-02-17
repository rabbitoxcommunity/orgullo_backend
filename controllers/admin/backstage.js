const formidable = require('formidable');

const fileHandler = require('../../utils/fileHandler');

const Backstage = require('../../models/Backstage');

module.exports.backstageForm = async (req, res) => {
    try {
        let backstage = null;
        if(req.params.id){
            backstage = await Backstage.findOne({_id:req.params.id});
        }

        return res.render('admin/add-backstage', { 
            title: 'Express', 
            baseLink: process.env.BASE_URL, 
            backstage
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.addBackstage = async (req, res) => {
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
                desc: fields.desc, 
                category: fields.category,
                about: fields.about,
            }

            if(files.banner) {
                const result = await fileHandler.mediaHandler(files.banner, 'public/images/backstage','image');
                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.banner = result.files[0]
            }
            if(files.attachments) {
                const result = await fileHandler.mediaHandler(files.attachments, 'public/images/backstage','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.attachments = result.files
            }

            await Backstage.create(payload)

            return res.status(200).json({
                success: true,
                message: "Backstage added successfully"
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

module.exports.editBackstage = async (req, res) => {
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
                desc: fields.desc, 
                category: fields.category,
                about: fields.about,
            }

            if(files.banner) {
                const result = await fileHandler.mediaHandler(files.banner, 'public/images/backstage','image');
                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.banner = result.files[0]
            }
            if(files.attachments) {
                const result = await fileHandler.mediaHandler(files.attachments, 'public/images/backstage','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.attachments = result.files
            }

            await Backstage.updateOne({ _id:fields.id }, payload)

            return res.status(200).json({
                success: true,
                message: "Backstage updated successfully"
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

module.exports.deleteBackstage = async (req, res) => {
    try {
        await Backstage.deleteOne({_id: req.params.id});
        return res.redirect('/admin/manage-backstage');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

module.exports.listBackstages = async (req, res) => {

    try {
        const backstages = await Backstage.find().sort({ updatedAt: -1});
        return res.render('admin/manage-backstage', { 
            title: 'Express',
            data: backstages,
            baseLink: process.env.BASE_URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}