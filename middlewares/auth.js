const jwt = require('jsonwebtoken');
const Enquiry = require('../models/Enquiry');

module.exports.authValidation = async (req, res, next) => {
    try {
        let token = ""
        if(typeof req.headers['authorization'] !== 'undefined'){
            const authHeader = req.headers['authorization']
            token = authHeader && authHeader.split(' ')[1]
        }    
        else if(typeof req.cookies.token !== 'undefined'){
            token = req.cookies.token 
        }   

        if(token) {
            const verified = await jwt.verify(token, process.env.JWT_SECRET)
            if(verified) {
                res.locals.admin_name = process.env.ADMIN_NAME
                res.locals.baseLink = process.env.BASE_URL
                res.locals.enquiriesCount = await Enquiry.countDocuments()
                next()
            } else {
                return res.redirect('/login')
            }
        } else {
            return res.redirect('/login')
        }
    } catch (err) {
        return res.redirect('/login')
    }
}

module.exports.authValidationLogin = async (req, res, next) => {
    try {
        let token = ""
        if(typeof req.headers['authorization'] !== 'undefined'){
            const authHeader = req.headers['authorization']
            token = authHeader && authHeader.split(' ')[1]
        }    
        else if(typeof req.cookies.token !== 'undefined'){
            token = req.cookies.token 
        }   
        if(token) {
            const verified = await jwt.verify(token, process.env.JWT_SECRET)
            
            if(verified) {
                return res.redirect('/admin')
            } else {
                next()
            }
        } else {
            next()
        }
        
    } catch (err) {
        return res.redirect('/login')
    }
}