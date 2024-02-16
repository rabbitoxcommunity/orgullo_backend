const formidable = require('formidable');

const fileHandler = require('../../utils/fileHandler');

const Backstage = require('../../models/Backstage');

module.exports.addBackstage = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
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