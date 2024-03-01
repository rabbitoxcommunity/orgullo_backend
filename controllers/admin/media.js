const formidable = require('formidable');

const fileHandler = require('../../utils/fileHandler');

const Media = require('../../models/Media');

module.exports.mediaForm = async (req, res) => {
    try {
        let media = null;
        if(req.params.id){
            media = await Media.findOne({_id:req.params.id});
        }
        console.log(media);
        return res.render('admin/add-media', {
            title: 'Express',
            media
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports.addMedia = async (req, res) => {
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
                const result = await fileHandler.mediaHandler(files.banner, 'public/images/media','image');
                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.banner = result.files[0]
            }
            if(files.attachments) {
                const result = await fileHandler.mediaHandler(files.attachments, 'public/images/media','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.attachments = result.files
            }

            if(files.thumbnail) {
                const result = await fileHandler.mediaHandler(files.thumbnail, 'public/images/media','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                let videos = []
                if(Array.isArray(fields.url)) {
                    for (let i = 0; i < result.files.length; i++) {
                        videos.push({
                            url: fields.url[i], 
                            thumbnail: result.files[i]
                        })
                    }
                }else {
                    videos.push({
                        url: fields.url, 
                        thumbnail: result.files[0]
                    })
                }

                payload.videos = videos
            }

            await Media.create(payload)

            return res.status(200).json({
                success: true,
                message: "Media added successfully"
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

module.exports.editMedia = async (req, res) => {
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

            // const media = await Media.findById(fields.id);
            // fields?.url?.map((url, index) => {
            //     console.log(url, index);
            //     media.videos[index].url = url        
            // })
            // await media.save()
            
            const payload = {
                title: fields.title,
                desc: fields.desc, 
                category: fields.category,
                about: fields.about,
            }

            if(files.banner) {
                const result = await fileHandler.mediaHandler(files.banner, 'public/images/media','image');
                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.banner = result.files[0]
            }
            if(files.attachments) {
                const result = await fileHandler.mediaHandler(files.attachments, 'public/images/media','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }

                payload.attachments = result.files
            }

            let videos = []
            if(files.thumbnail) {
                const result = await fileHandler.mediaHandler(files.thumbnail, 'public/images/media','image');

                if (result.error_status) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    })
                }
                // console.log(fields.url);
                // fields.url = fields.url.reverse();
                // console.log(fields.url);
                if(Array.isArray(fields.url)) {
                    for (let i = 0; i < result.files.length; i++) {
                        videos.push({
                            url: fields.url[i], 
                            thumbnail: result.files[i]
                        })
                    }
                }else {
                    videos.push({
                        url: fields.url, 
                        thumbnail: result.files[0]
                    })
                }
            }

            await Media.updateOne({ _id: fields.id }, { $set: payload, $push: { videos: videos } });

            return res.status(200).json({
                success: true,
                message: "Media updated successfully"
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

module.exports.deleteMedia = async (req, res) => {
    try {
        await Media.deleteOne({_id: req.params.id});
        return res.redirect('/admin/manage-media');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

module.exports.listMedias = async (req, res) => {

    try {
        const medias = await Media.find().sort({ updatedAt: -1});
        return res.render('admin/manage-media', { 
            title: 'Express',
            data: medias
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}