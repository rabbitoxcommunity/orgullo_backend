const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const { response } = require('express');

module.exports.getForm = async (req, res) => {
    try {
        return res.render('admin/login', { 
            title: 'Orgullo | Login',
            baseLink: process.env.BASE_URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.submitLogin = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
          
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid request. Please try again.",
                });
            }

            // Validate email
            if (fields.email !== process.env.ADMIN_EMAIL) {
                return res.status(400).send({
                    success: false,
                    message: "Error! Incorrect email.",
                });
            }

            // Validate password
            if (fields.password !== process.env.ADMIN_PASS) {
                return res.status(400).send({
                    success: false,
                    message: "Error! Incorrect password.",
                });
            }

            // Generate JWT token
            const accessToken = jwt.sign(
                { email: process.env.ADMIN_EMAIL },
                process.env.JWT_SECRET,
                { expiresIn: "100d" }
            );

            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                accessToken: accessToken,
                admin_name: process.env.ADMIN_NAME,
            });
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).send({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    }
};

module.exports.logout = async (req, res) => {
    try {
        req.cookies = ''
        res.clearCookie('token');
        res.redirect('/login');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};