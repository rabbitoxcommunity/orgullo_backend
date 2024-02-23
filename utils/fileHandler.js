const path = require('path')
const fs = require('fs')

module.exports.mediaHandler = async (files, mediaPath, fileType = null, filePrefix = null) => {
    if (!filePrefix) {
        filePrefix = new Date().getTime();
    }
    try {
        let result = {
            files: [],
        };
        let order = [];

        if (Array.isArray(files)) {
            await Promise.all(
                files.map(async (media, key) => {
                    if (media.originalFilename !== "") {
                        const response = await moveFile(media, mediaPath, filePrefix);
                        result.files.push(response);
                        order.push(key);
                    }
                })
            );
            result.error_status = 0;
        } else if (files.originalFilename !== "") {
            const response = await moveFile(files, mediaPath, filePrefix);
            result.files.push(response);
            order.push(0);
            result.error_status = 0;
        }

        result.files = order.map((index) => result.files[index]);

        return result; // {file: result, error_status: 0}
    } catch (err) {
        return { error_status: 1 };
    }
};     

const moveFile = async (file, mediaPath, filePrefix) => {        
    const oldPath = file.filepath
    const filename = filePrefix +'_'+ file.originalFilename
    var newPath = path.join(path.resolve("./"), mediaPath)
        + '/' + filename;
    var rawData = fs.readFileSync(oldPath);
    return await new Promise(async function (resolve, reject) {
        fs.writeFile(newPath, rawData, async function (err) {
            if (!err) {
                resolve(filename)
            }
            reject(err)
        })
    }).then((data) => {
        if (data) {
            return data
        } else {
            return 'error'
        }
    })
}