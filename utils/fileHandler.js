const path = require('path')
const fs = require('fs')

module.exports.mediaHandler = async (files, mediaPath,fileType=null, filePrefix=null) => {   
    if(!filePrefix){
        //Setting default value if null
        filePrefix = new Date().getTime()
    }             
    try { 
        let result = {
            files:[],
        } 

        if (Array.isArray(files)) {
            await Promise.all(files.map(async (media, key) => { 
                if (files.originalFilename != "") {
                    const response = await moveFile(media, mediaPath, filePrefix)
                    result.files.push(response)
                }                     
            }))
            result.error_status = 0
        } else if (files.originalFilename != "") {
            const response = await moveFile(files, mediaPath, filePrefix)
            result.files.push(response)
            result.error_status = 0
        }


        return result// {file: result, error_status: 0}
    }catch(err){            
        return {error_status:1}
    }  
}      

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