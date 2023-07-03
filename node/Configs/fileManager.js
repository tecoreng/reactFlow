const fs = require('fs');
const path = require('path');
const multer = require('multer');

const {
    PATHS
} = require('./constants');

/* 
    When any request comes images are first uploaded to TEMP > ORIGINAL folder.
    As of now Images are uploaded to local folder to simulate cloud uploads.
    It is assumed default file will be in respective folder as `default.png`.

    keywords :
    primary : primary path /Users
    secondary : /Original, /Thumb
*/
// Image size and type validation
const maxSize = 1 * 1024 * 1024; // for 1MB

const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

class FileManager {

    constructor() {
        this.imageResizeResolution = parseInt(process.env.IMAGE_RESIZE_RESOLUTION)
    }

    //CREATE FILE NAME
    getFileName(file) {
        return file.originalname;
    }

    async getFileExtension(filename) {
        if (filename) {
            let fileSplit = filename.split(".");
            if (fileSplit.length === 2) {
                return fileSplit[1];
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    resolvePath(filePath) {
       // upload file in proper folder
    console.log('=====================================================>filePath',filePath);
       if(filePath == "logo"){
        return path.join(__dirname, "./../assets/logo/")
        }
       if(filePath == "category_image"){
            return path.join(__dirname, "./../assets/category/")
        }
        else if(filePath == "service_images"){
            return path.join(__dirname, "./../assets/service/")
        }
        else if(filePath == "subcategory_image"){
            return path.join(__dirname, "./../assets/subcategory/")
        }
        else if(filePath == "product_images") {
            return path.join(__dirname, "./../assets/product/")
        }
        else if(filePath == "banner_image") {
            return path.join(__dirname, "./../assets/banner/")
        }
    return path.join(__dirname, "./../assets/images/")
    }

    upload() {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const isValid = FILE_TYPE_MAP[file.mimetype];
                let uploadError = new Error('invalid image type');
                
                if(isValid){
                    uploadError = null
                }
                console.log("multerfile",file)
                console.log('=======================>>>>',file);
                cb(uploadError, this.resolvePath(file.fieldname))
                //cb(uploadError, this.resolvePath())
                
            }.bind(this),
            filename: function (req, file, cb) {
                let fileName = this.getFileName(file)
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                    req.body[file.fieldname].push(fileName)
                } else
                    req.body[file.fieldname].push(fileName)
                cb(null, fileName)
            }.bind(this)
        })

        return multer({
            // TODO: Add file size limit
            storage,
            limits: { fileSize: maxSize }
        });
    }
    
}

module.exports = FileManager