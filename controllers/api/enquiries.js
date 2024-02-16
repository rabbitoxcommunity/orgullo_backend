const formidable = require('formidable');

const Enquiry = require('../../models/Enquiry');

module.exports.addEnquiry = async (req, res) => {
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

            await Enquiry.create(fields);

            return res.status(200).json({
                success: true,
                message: "Enquiry submitted successfully"
            })

        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};