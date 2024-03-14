const formidable = require('formidable');
const nodeMailer = require('nodemailer');

var dotenv = require('dotenv');
dotenv.config()

const Enquiry = require('../../models/Enquiry');

let transporter = nodeMailer.createTransport({
    // name: 'hostgator',
     host: process.env.MAILER_SMTP,
     port: process.env.MAILER_PORT,
     // secure: true,
     auth: {
         user: process.env.MAILER_AUTH_USER,
         pass: process.env.MAILER_AUTH_PASS
     }
});

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

            let mailOptions = {
                from: {
                    name: 'Orgullo Studio Team',
                    address: process.env.MAILER_AUTH_USER,
                },
                to: process.env.MAIL_TO,
                subject: "Enquiry form submitted",
                //text: 'Hi this is test mail',
                html: 'The Content <br><br>'+fields.message,
                // attachments: [
                //     {
                //         path: process.env.BACKEND_URL+'resumes/'+filename
                //     },
                //     {
                //         filename: 'logo.png',
                //         path: `${__dirname}/email-enquiry/PRIMA.png`,
                //         cid: 'logo1' //same cid value as in the html img src
                //     }
                // ]
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }
                
                await Enquiry.create(fields);

                return res.status(200).send({
                    status: true,
                    message:"Thank you for submitting your enquiry. Our team will get back to you shortly."
                })
               
            });
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};